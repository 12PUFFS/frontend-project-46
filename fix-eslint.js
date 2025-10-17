#!/usr/bin/env node

// This script is used to fix the indentation in the expected files
// It replaces 2-space indentation with 4-space indentation

import { readFileSync, writeFileSync } from 'fs';

const files = [
  '__fixtures__/expected_stylish.txt',
  '__fixtures__/expected_plain.txt',
  '__fixtures__/expected_nested.txt',
];

files.forEach((file) => {
  try {
    const content = readFileSync(file, 'utf8');
    // Заменяем 2 пробела на 4 пробела - используем {2} вместо двух пробелов
    const fixedContent = content.replace(/^(\s{2})/gm, '    ');
    writeFileSync(file, fixedContent);
    console.log(`Fixed indentation in ${file}`);
  } catch (error) {
    console.error(`Error processing ${file}:`, error.message);
  }
});