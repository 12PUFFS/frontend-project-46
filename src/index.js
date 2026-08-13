import path from 'path';
import parse from './parsers/index.js';
import getFormatter from './formatters/index.js';

const getAbsolutePath = (filePath) => {
  if (path.isAbsolute(filePath)) {
    return filePath;
  }
  return path.resolve(process.cwd(), filePath);
};

const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

const buildDiff = (data1, data2) => {
  const keys = Object.keys({ ...data1, ...data2 }).sort();

  return keys.map((key) => {
    const hasKey1 = Object.hasOwn(data1, key);
    const hasKey2 = Object.hasOwn(data2, key);

    if (!hasKey1 && hasKey2) {
      return { key, type: 'added', value: data2[key] };
    }
    if (hasKey1 && !hasKey2) {
      return { key, type: 'removed', value: data1[key] };
    }
    if (isObject(data1[key]) && isObject(data2[key])) {
      const children = buildDiff(data1[key], data2[key]);
      return { key, type: 'nested', children };
    }
    if (data1[key] !== data2[key]) {
      return { key, type: 'changed', oldValue: data1[key], newValue: data2[key] };
    }
    return { key, type: 'unchanged', value: data1[key] };
  });
};

export default function genDiff(filepath1, filepath2, format = 'stylish') {
  const absolutePath1 = getAbsolutePath(filepath1);
  const absolutePath2 = getAbsolutePath(filepath2);

  const data1 = parse(absolutePath1);
  const data2 = parse(absolutePath2);

  const diff = buildDiff(data1, data2);
  return getFormatter(diff, format);
}
