#!/usr/bin/env node

import { Command } from 'commander';

const programm = new Command();

programm
  .name('gendiff')
  .arguments('filepath1 filepath2')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);
