const _ = require('lodash')

const formatValue = (value, depth = 0) => {
  if (!_.isObject(value) || _.isArray(value)) {
    return value
  }

  const indent = '    '.repeat(depth)
  const bracketIndent = '    '.repeat(depth - 1)
  const lines = Object.entries(value).map(([key, val]) => {
    const formattedValue = formatValue(val, depth + 1)
    return `${indent}${key}: ${formattedValue}`
  })

  return `{\n${lines.join('\n')}\n${bracketIndent}}`
}

const formatStylish = (tree, depth = 1) => {
  const indent = '    '.repeat(depth - 1)
  const lines = tree.map((node) => {
    const { key, type } = node
    const currentIndent = '    '.repeat(depth)

    switch (type) {
    case 'added':
      return `${currentIndent.slice(0, -2)}+ ${key}: ${formatValue(node.value, depth + 1)}`
    case 'removed':
      return `${currentIndent.slice(0, -2)}- ${key}: ${formatValue(node.value, depth + 1)}`
    case 'updated':
      return `${currentIndent.slice(0, -2)}- ${key}: ${formatValue(node.oldValue, depth + 1)}\n${currentIndent.slice(0, -2)}+ ${key}: ${formatValue(node.value, depth + 1)}`
    case 'unchanged':
      return `${currentIndent}${key}: ${formatValue(node.value, depth + 1)}`
    case 'nested':
      return `${currentIndent}${key}: ${formatStylish(node.children, depth + 1)}`
    default:
      throw new Error(`Unknown node type: ${type}`)
    }
  })

  return `{\n${lines.join('\n')}\n${indent}}`
}

module.exports = formatStylish
