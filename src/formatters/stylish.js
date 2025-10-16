import _ from 'lodash';

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

export default formatStylish;