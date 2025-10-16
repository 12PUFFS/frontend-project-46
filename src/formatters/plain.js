const _ = require('lodash')

const formatPlain = (diff, path = '') => {
  const lines = diff.flatMap((node) => {
    const currentPath = path ? `${path}.${node.key}` : node.key

    switch (node.type) {
    case 'added':
      return `Property '${currentPath}' was added with value: ${formatValue(node.value)}`
    case 'removed':
      return `Property '${currentPath}' was removed`
    case 'changed':
      return `Property '${currentPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`
    case 'nested':
      return formatPlain(node.children, currentPath)
    case 'unchanged':
      return []
    default:
      return []
    }
  })

  return lines.join('\n')
}

const formatValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]'
  }

  if (typeof value === 'string') {
    return `'${value}'`
  }

  if (value === null) {
    return 'null'
  }

  return String(value)
}

module.exports = formatPlain