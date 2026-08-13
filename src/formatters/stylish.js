const formatValue = (value, depth = 0) => {
  if (value === null) return 'null';
  if (typeof value === 'object' && !Array.isArray(value)) {
    const indent = '    '.repeat(depth + 1);
    const lines = Object.entries(value).map(([key, val]) => {
      const formattedVal = typeof val === 'object' && val !== null
        ? formatValue(val, depth + 1)
        : val;
      return `${indent}${key}: ${formattedVal}`;
    });
    return `{\n${lines.join('\n')}\n${'    '.repeat(depth)}}`;
  }
  return String(value);
};

const stylish = (diff, depth = 0) => {
  const indent = '    '.repeat(depth);
  const lines = diff.map((node) => {
    const spaces = '    '.repeat(depth);

    if (node.type === 'added') {
      return `${spaces}  + ${node.key}: ${formatValue(node.value, depth + 1)}`;
    }
    if (node.type === 'removed') {
      return `${spaces}  - ${node.key}: ${formatValue(node.value, depth + 1)}`;
    }
    if (node.type === 'changed') {
      return `${spaces}  - ${node.key}: ${formatValue(node.oldValue, depth + 1)}\n${spaces}  + ${node.key}: ${formatValue(node.newValue, depth + 1)}`;
    }
    if (node.type === 'nested') {
      return `${spaces}    ${node.key}: ${stylish(node.children, depth + 1)}`;
    }
    return `${spaces}    ${node.key}: ${formatValue(node.value, depth + 1)}`;
  });

  return `{\n${lines.join('\n')}\n${indent}}`;
};

export default stylish;
