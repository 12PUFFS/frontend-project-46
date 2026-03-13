import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

export default function logParsedFiles(filepath1, filepath2) {
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

  console.log(
    `1-file: ${JSON.stringify(parsedFile1)}\n2-file: ${JSON.stringify(parsedFile2)}`,
  );
}
