#!/usr/bin/env node

import { Command } from 'commander';

const command = new Command();

command
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .parse(process.argv);
