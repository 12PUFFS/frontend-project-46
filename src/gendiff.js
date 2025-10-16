const { parseFile } = require('./parsers.js')
const getFormatter = require('./formatters/index.js')
const buildTree = require('./buildTree.js')

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)
  const diff = buildTree(data1, data2)
  const format = getFormatter(formatName)

  return format(diff)
}

module.exports = genDiff