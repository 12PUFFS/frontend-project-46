const genDiff = require('./src/index')

const result = genDiff('__fixtures__/nested1.json', '__fixtures__/nested2.json')
console.log('NESTED RESULT:')
console.log(result)