const _ = require('lodash')

const formatValue = (value, depth = 0) => {
  if (!_.isObject(value) || _.isArray(value)) {
    if (value === null) return 'null'
    if (value === '') return ''
    return value
  }

  const indent = '    '.repeat(depth)
  const bracketIndent = '    '.repeat(depth - 1)
  const entries = Object.entries(value)
  const lines = entries.map(([key, val]) => {
    const formattedValue = formatValue(val, depth + 1)
    return `${indent}    ${key}: ${formattedValue}`  // ← 4 пробела + ключ
  })

  return `{\n${lines.join('\n')}\n${bracketIndent}}`
}

const formatStylish = (tree, depth = 0) => {
  const indent = '    '.repeat(depth)
  const lines = tree.map((node) => {
    const { key, type } = node

    switch (type) {
      case 'added':
        return `${indent}  + ${key}: ${formatValue(node.value, depth + 1)}`      // 2 пробела + +
      case 'removed':
        return `${indent}  - ${key}: ${formatValue(node.value, depth + 1)}`      // 2 пробела + -
      case 'updated':
        return `${indent}  - ${key}: ${formatValue(node.oldValue, depth + 1)}\n${indent}  + ${key}: ${formatValue(node.value, depth + 1)}`
      case 'unchanged':
        return `${indent}    ${key}: ${formatValue(node.value, depth + 1)}`      // 4 пробела
      case 'nested':
        return `${indent}    ${key}: ${formatStylish(node.children, depth + 1)}` // 4 пробела
      default:
        throw new Error(`Unknown node type: ${type}`)
    }
  })

  return `{\n${lines.join('\n')}\n${indent}}`
}

module.exports = formatStylish