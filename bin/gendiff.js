#!/usr/bin/env node

const { program } = require('commander');

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'display help for command')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);
