import { readFileSync } from 'fs';
import { extname, resolve } from 'path';
import yaml from 'js-yaml';

const readFile = (filepath) => {
  const absolutePath = resolve(process.cwd(), filepath);
  return readFileSync(absolutePath, 'utf-8');
};

const parse = (data, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case '.yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
};

const buildTree = (obj1, obj2) => {
  const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])].sort();
  
  return keys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    
    if (!(key in obj1)) {
      return { key, value: value2, type: 'added' };
    }
    
    if (!(key in obj2)) {
      return { key, value: value1, type: 'deleted' };
    }
    
    if (value1 === value2) {
      return { key, value: value1, type: 'unchanged' };
    }
    
    if (typeof value1 === 'object' && typeof value2 === 'object' && value1 !== null && value2 !== null) {
      return { key, children: buildTree(value1, value2), type: 'nested' };
    }
    
    return {
      key,
      oldValue: value1,
      value: value2,
      type: 'changed',
    };
  });
};

const formatValue = (value, depth) => {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (typeof value !== 'object') {
    return String(value);
  }
  
  const indent = '  '.repeat(depth * 2);
  const bracketIndent = '  '.repeat(depth * 2 - 2);
  
  const entries = Object.entries(value);
  if (entries.length === 0) {
    return '{}';
  }
  
  const lines = entries.map(([key, val]) => {
    return `${indent}${key}: ${formatValue(val, depth + 1)}`;
  });
  
  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const formatStylish = (tree, depth = 1) => {
  const indent = '  '.repeat(depth * 2 - 2);
  const bracketIndent = '  '.repeat(depth * 2 - 2);
  
  const lines = tree.map((node) => {
    const { key, type } = node;
    
    switch (type) {
      case 'added':
        return `${indent}+ ${key}: ${formatValue(node.value, depth)}`;
      case 'deleted':
        return `${indent}- ${key}: ${formatValue(node.value, depth)}`;
      case 'unchanged':
        return `${indent}  ${key}: ${formatValue(node.value, depth)}`;
      case 'changed':
        return [
          `${indent}- ${key}: ${formatValue(node.oldValue, depth)}`,
          `${indent}+ ${key}: ${formatValue(node.value, depth)}`,
        ].join('\n');
      case 'nested':
        return `${indent}  ${key}: ${formatStylish(node.children, depth + 1)}`;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });
  
  if (depth === 1) {
    return ['{', ...lines, '}'].join('\n');
  }
  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const formatPlain = (tree, path = '') => {
  const lines = tree.flatMap((node) => {
    const currentPath = path ? `${path}.${node.key}` : node.key;
    
    switch (node.type) {
      case 'added':
        return `Property '${currentPath}' was added with value: ${formatPlainValue(node.value)}`;
      case 'deleted':
        return `Property '${currentPath}' was removed`;
      case 'changed':
        return `Property '${currentPath}' was updated. From ${formatPlainValue(node.oldValue)} to ${formatPlainValue(node.value)}`;
      case 'nested':
        return formatPlain(node.children, currentPath);
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  });
  
  return lines.join('\n');
};

const formatPlainValue = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const formatJson = (tree) => {
  return JSON.stringify(tree, null, 2);
};

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJson,
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  
  const format1 = extname(filepath1);
  const format2 = extname(filepath2);
  
  const obj1 = parse(data1, format1);
  const obj2 = parse(data2, format2);
  
  const tree = buildTree(obj1, obj2);
  
  const formatter = formatters[format];
  if (!formatter) {
    throw new Error(`Unknown format: ${format}`);
  }
  
  return formatter(tree);
};

export default genDiff;