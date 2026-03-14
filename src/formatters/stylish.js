const makeIndent = (depth, spacesCount = 4) =>
  ' '.repeat(depth * spacesCount - 2);

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value);
  }
  const indent = makeIndent(depth + 1);
  const bracketIndent = makeIndent(depth);
  const lines = Object.entries(value).map(
    ([k, v]) => `${indent}  ${k}: ${stringify(v, depth + 1)}`,
  );
  return `{\n${lines.join('\n')}\n${bracketIndent}  }`;
};

const stylish = (diff, depth = 1) => {
  const indent = makeIndent(depth);
  const lines = diff.map((node) => {
    switch (node.type) {
      case 'added':
        return `${indent}+ ${node.key}: ${stringify(node.value, depth)}`;
      case 'removed':
        return `${indent}- ${node.key}: ${stringify(node.value, depth)}`;
      case 'changed':
        return [
          `${indent}- ${node.key}: ${stringify(node.oldValue, depth)}`,
          `${indent}+ ${node.key}: ${stringify(node.newValue, depth)}`,
        ].join('\n');
      case 'nested':
        return `${indent}  ${node.key}: ${stylish(node.children, depth + 1)}`;
      case 'unchanged':
        return `${indent}  ${node.key}: ${stringify(node.value, depth)}`;
      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  });
  return `{\n${lines.join('\n')}\n${' '.repeat(depth * 4 - 4)}}`;
};

export default stylish;
