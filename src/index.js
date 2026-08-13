import fs from 'fs';
import path from 'path';

const parseFile = (filePath) => {
  const ext = path.extname(filePath);
  const data = fs.readFileSync(filePath, 'utf-8');
  if (ext === '.json') {
    return JSON.parse(data);
  }

  throw new Error(`Unsupported file format: ${ext}`);
};

export default function genDiff(file1, file2) {
  const data1 = parseFile(file1);
  const data2 = parseFile(file2);

  return {
    file1: data1,
    file2: data2,
  };
}
