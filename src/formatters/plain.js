const _ = require('lodash')

const formatValueForPlain = (value) => {
  if (_.isObject(value) && !_.isArray(value)) {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }
  return value
}

const formatPlain = (tree, path = '') => {
  const lines = tree.flatMap((node) => {
    const { key, type } = node
    const currentPath = path ? `${path}.${key}` : key

    switch (type) {
    case 'added':
      return `Property '${currentPath}' was added with value: ${formatValueForPlain(node.value)}`
    case 'removed':
      return `Property '${currentPath}' was removed`
    case 'updated':
      return `Property '${currentPath}' was updated. From ${formatValueForPlain(node.oldValue)} to ${formatValueForPlain(node.value)}`
    case 'nested':
      return formatPlain(node.children, currentPath)
    case 'unchanged':
      return []
    default:
      throw new Error(`Unknown node type: ${type}`)
    }
  })

  return lines.join('\n')
}

module.exports = formatPlain
