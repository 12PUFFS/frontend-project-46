const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const getFileContent = (filepath) => {
  // Сначала проверяем расширение
  const extension = path.extname(filepath).toLowerCase()
  if (!['.json', '.yml', '.yaml'].includes(extension)) {
    throw new Error(`Unsupported file format: ${extension}`)
  }

  try {
    const absolutePath = path.resolve(process.cwd(), filepath)
    const content = fs.readFileSync(absolutePath, 'utf-8')
    return content
  } catch (error) {
    throw new Error(`Cannot read file: ${filepath}`)
  }
}

const parseFile = (filepath) => {
  const content = getFileContent(filepath)
  const extension = path.extname(filepath).toLowerCase()

  try {
    switch (extension) {
    case '.json':
      return JSON.parse(content)
    case '.yml':
    case '.yaml':
      return yaml.load(content)
    default:
      throw new Error(`Unsupported file format: ${extension}`)
    }
  } catch (error) {
    throw new Error(`Cannot parse file: ${filepath}`)
  }
}

module.exports = { getFileContent, parseFile }