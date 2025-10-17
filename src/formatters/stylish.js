import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value) && !_.isArray(value)) {
    return '[complex value]';
  }
  return value;
};

const formatStylish = (tree) => {
  const lines = tree.map((node) => {
    const { key, type } = node;
    
    switch (type) {
      case 'added':
        return `  + ${key}: ${formatValue(node.value)}`;
      case 'removed':
        return `  - ${key}: ${formatValue(node.value)}`;
      case 'updated':
        return `  - ${key}: ${formatValue(node.oldValue)}\n  + ${key}: ${formatValue(node.value)}`;
      case 'unchanged':
        return `    ${key}: ${formatValue(node.value)}`;
      default:
        throw new Error(`Unknown node type: ${type}`);
    }
  });
  
  return `{\n${lines.join('\n')}\n}`;
};

export default formatStylish;