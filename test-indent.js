const genDiff = require('./src/index')

const result = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')
console.log('RESULT:')
console.log(result)
console.log('END RESULT')

// Посмотрим на первые несколько строк
const lines = result.split('\n')
console.log('\nFIRST 10 LINES:')
lines.slice(0, 10).forEach((line, i) => {
  console.log(`${i}: "${line}"`)
})
