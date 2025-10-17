const { readFileSync } = require('fs')
const { extname } = require('path')
const _ = require('lodash')
const parse = require('./parsers')

const buildTree = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)))

  return keys.map((key) => {
    const value1 = data1[key]
    const value2 = data2[key]

    if (!_.has(data1, key)) {
      return {
        key,
        value: value2,
        type: 'added',
      }
    }

    if (!_.has(data2, key)) {
      return {
        key,
        value: value1,
        type: 'removed',
      }
    }

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        key,
        type: 'nested',
        children: buildTree(value1, value2),
      }
    }

    if (_.isEqual(value1, value2)) {
      return {
        key,
        value: value1,
        type: 'unchanged',
      }
    }

    return {
      key,
      oldValue: value1,
      value: value2,
      type: 'updated',
    }
  })
}

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

const formatValueForPlain = (value) => {
  if (_.isObject(value) && !_.isArray(value)) {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }
  return value
}

const formatJson = (tree) => {
  return JSON.stringify(tree, null, 2)
}

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const content1 = readFileSync(filepath1, 'utf-8')
  const content2 = readFileSync(filepath2, 'utf-8')

  const format1 = extname(filepath1).slice(1)
  const format2 = extname(filepath2).slice(1)

  const data1 = parse(content1, format1)
  const data2 = parse(content2, format2)

  const tree = buildTree(data1, data2)

  switch (formatName) {
    case 'stylish':
      return formatStylish(tree)
    case 'plain':
      return formatPlain(tree)
    case 'json':
      return formatJson(tree)
    default:
      throw new Error(`Unsupported format: ${formatName}`)
  }
}

module.exports = genDiff