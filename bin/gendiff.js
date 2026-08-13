#!/usr/bin/env node

const { program } = require('commander');
const { default: genDiff } = require('../src');

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'display help for command')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const format = program.opts().format || 'stylish';
    const result = genDiff(filepath1, filepath2);
    console.log(result); // Убираем JSON.stringify()
  })
  .parse(process.argv);
