#!/usr/bin/env node
const { Command } = require('commander')
const genDiff = require('../src/index')

const program = new Command()

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    try {
      const result = genDiff(filepath1, filepath2, options.format)
      console.log(result)
    } catch (error) {
      console.error(`Error: ${error.message}`)
      process.exit(1)
    }
  })  // ← фигурная скобка должна быть на этой строке

program.parse()
