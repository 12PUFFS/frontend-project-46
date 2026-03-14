const stringify = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const plain = (diff, path = '') => {
  const lines = diff
    .filter((node) => node.type !== 'unchanged')
    .map((node) => {
      const propertyPath = path ? `${path}.${node.key}` : node.key;

      switch (node.type) {
        case 'added':
          return `Property '${propertyPath}' was added with value: ${stringify(node.value)}`;
        case 'removed':
          return `Property '${propertyPath}' was removed`;
        case 'changed':
          return `Property '${propertyPath}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`;
        case 'nested':
          return plain(node.children, propertyPath);
        default:
          throw new Error(`Unknown type: ${node.type}`);
      }
    });

  return lines.join('\n');
};

export default plain;
