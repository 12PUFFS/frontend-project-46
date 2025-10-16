#!/usr/bin/env node

const { program } = require('commander')
const genDiff = require('../src/index.js')

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const options = program.opts()
    const diff = genDiff(filepath1, filepath2, options.format)
    console.log(diff)
  })

program.parse()
