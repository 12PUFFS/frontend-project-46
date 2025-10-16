const formatStylish = require('./stylish.js')
const formatPlain = require('./plain.js')
const formatJson = require('./json.js')

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJson,
}

module.exports = (formatName) => {
  const formatter = formatters[formatName]
  if (!formatter) {
    throw new Error(`Unknown format: ${formatName}`)
  }
  return formatter
}
