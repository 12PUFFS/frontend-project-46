import { readFileSync } from 'fs';
import { extname, resolve } from 'path';
import yaml from 'js-yaml';

const readFile = (filepath) => {
  const absolutePath = resolve(process.cwd(), filepath);
  return readFileSync(absolutePath, 'utf-8');
};

const parse = (data, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case '.yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
};

const genDiff = (filepath1, filepath2) => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  
  const format1 = extname(filepath1);
  const format2 = extname(filepath2);
  
  const obj1 = parse(data1, format1);
  const obj2 = parse(data2, format2);
  
  // Пока просто вернем объекты для отладки
  return `Object 1: ${JSON.stringify(obj1)}\nObject 2: ${JSON.stringify(obj2)}`;
};

export default genDiff;