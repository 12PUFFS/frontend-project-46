#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/index.js';

const programm = new Command();

programm
  .name('gendiff')
  .arguments('filepath1 filepath2')
  .action((filepath1, filepath2) => {
    const result = genDiff(filepath1, filepath2);
    console.log(result);
  })
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format', 'stylish')
  .parse();
