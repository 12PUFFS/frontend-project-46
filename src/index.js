import fs from 'fs';
import path from 'path';

const parseFile = (filePath) => {
  const absolutePath = path.isAbsolute(filePath)
    ? filePath
    : path.resolve(process.cwd(), filePath);

  const ext = path.extname(absolutePath);
  const data = fs.readFileSync(absolutePath, 'utf-8');

  if (ext === '.json') {
    return JSON.parse(data);
  }

  throw new Error(`Unsupported file format: ${ext}`);
};

export default function genDiff(filepath1, filepath2) {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  const keys = Object.keys({ ...data1, ...data2 }).sort();

  const lines = keys.map((key) => {
    const hasKey1 = Object.hasOwn(data1, key);
    const hasKey2 = Object.hasOwn(data2, key);

    if (!hasKey1 && hasKey2) {
      return `  + ${key}: ${data2[key]}`;
    }

    if (hasKey1 && !hasKey2) {
      return `  - ${key}: ${data1[key]}`;
    }

    if (data1[key] !== data2[key]) {
      return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
    }

    return `    ${key}: ${data1[key]}`;
  });

  return `{\n${lines.join('\n')}\n}`;
}
