import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

export default function genDiff(filepath1, filepath2) {
  const file1 = fs.readFileSync(filepath1, 'utf-8');
  const file2 = fs.readFileSync(filepath2, 'utf-8');

  const ext1 = path.extname(filepath1);
  const ext2 = path.extname(filepath2);

  let parsedFile1;
  let parsedFile2;

  if (ext1 === '.json') {
    parsedFile1 = JSON.parse(file1);
  } else if (ext1 === '.yml' || ext1 === '.yaml') {
    parsedFile1 = yaml.load(file1);
  }

  if (ext2 === '.json') {
    parsedFile2 = JSON.parse(file2);
  } else if (ext2 === '.yml' || ext2 === '.yaml') {
    parsedFile2 = yaml.load(file2);
  }

  const keysFile1 = Object.keys(parsedFile1);
  const keysFile2 = Object.keys(parsedFile2);

  const allKeys = [...keysFile1, ...keysFile2];
  const uniqKeys = [...new Set(allKeys)];
  const sortedKeys = uniqKeys.sort();

  let lines = [];

  for (const key of sortedKeys) {
    const value1 = parsedFile1[key];
    const value2 = parsedFile2[key];

    if (key in parsedFile1 && !(key in parsedFile2)) {
      lines.push(`  - ${key}: ${value1}`);
    } else if (!(key in parsedFile1) && key in parsedFile2) {
      lines.push(`  + ${key}: ${value2}`);
    } else if (key in parsedFile1 && key in parsedFile2) {
      if (value1 !== value2) {
        lines.push(`  - ${key}: ${value1}`);
        lines.push(`  + ${key}: ${value2}`);
      } else {
        lines.push(`    ${key}: ${value1}`);
      }
    }
  }

  return `{\n${lines.join('\n')}\n}`;
}
