const formatValue = (value) => {
  if (value === null) return 'null';
  if (typeof value === 'string') return `'${value}'`;
  if (typeof value === 'object') return '[complex value]';
  return String(value);
};

const plain = (diff, parentPath = '') => {
  const lines = [];

  diff.forEach((node) => {
    if (node.type === 'unchanged') {
      return;
    }

    const propertyPath = parentPath ? `${parentPath}.${node.key}` : node.key;

    if (node.type === 'added') {
      lines.push(`Property '${propertyPath}' was added with value: ${formatValue(node.value)}`);
    } else if (node.type === 'removed') {
      lines.push(`Property '${propertyPath}' was removed`);
    } else if (node.type === 'changed') {
      lines.push(`Property '${propertyPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`);
    } else if (node.type === 'nested') {
      const nestedLines = plain(node.children, propertyPath);
      if (nestedLines) {
        lines.push(nestedLines);
      }
    }
  });

  return lines.join('\n');
};

export default plain;
