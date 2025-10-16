import { parseFile } from './parsers.js';
import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  
  return keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    
    if (!_.has(data1, key)) {
      return { key, value: value2, type: 'added' };
    }
    
    if (!_.has(data2, key)) {
      return { key, value: value1, type: 'removed' };
    }
    
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, children: buildTree(value1, value2), type: 'nested' };
    }
    
    if (_.isEqual(value1, value2)) {
      return { key, value: value1, type: 'unchanged' };
    }
    
    return { 
      key, 
      oldValue: value1, 
      newValue: value2, 
      type: 'changed' 
    };
  });
};

const formatStylish = (diff, depth = 1) => {
  const indent = ' '.repeat(4 * depth - 2);
  const bracketIndent = ' '.repeat(4 * (depth - 1));
  
  const lines = diff.map((node) => {
    switch (node.type) {
      case 'added':
        return `${indent}+ ${node.key}: ${formatValue(node.value, depth + 1)}`;
      case 'removed':
        return `${indent}- ${node.key}: ${formatValue(node.value, depth + 1)}`;
      case 'unchanged':
        return `${indent}  ${node.key}: ${formatValue(node.value, depth + 1)}`;
      case 'changed':
        return [
          `${indent}- ${node.key}: ${formatValue(node.oldValue, depth + 1)}`,
          `${indent}+ ${node.key}: ${formatValue(node.newValue, depth + 1)}`
        ].join('\n');
      case 'nested':
        return `${indent}  ${node.key}: ${formatStylish(node.children, depth + 1)}`;
      default:
        return '';
    }
  });
  
  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const formatValue = (value, depth) => {
  if (_.isPlainObject(value)) {
    const indent = ' '.repeat(4 * depth - 2);
    const bracketIndent = ' '.repeat(4 * (depth - 1));
    
    const lines = Object.entries(value).map(([key, val]) => {
      return `${indent}  ${key}: ${formatValue(val, depth + 1)}`;
    });
    
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  }
  
  if (value === null) return 'null';
  if (value === '') return '';
  return String(value);
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  const diff = buildTree(data1, data2);
  
  return formatStylish(diff);
};

export default genDiff;