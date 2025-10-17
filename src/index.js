const { readFileSync } = require('fs')
const { extname } = require('path')
const _ = require('lodash')
const parse = require('./parsers')
const formatStylish = require('./formatters/stylish')

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
  default:
    throw new Error(`Unsupported format: ${formatName}`)
  }
}

module.exports = genDiff
