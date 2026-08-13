import path from 'path';
import parse from './parsers/index.js';

const getAbsolutePath = (filePath) => {
  if (path.isAbsolute(filePath)) {
    return filePath;
  }
  return path.resolve(process.cwd(), filePath);
};

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
    if (data1[key] !== data2[key]) {
      return { key, type: 'changed', oldValue: data1[key], newValue: data2[key] };
    }
    return { key, type: 'unchanged', value: data1[key] };
  });
};

const formatDiff = (diff) => {
  const lines = diff.map((item) => {
    // Используем if/else вместо switch для лучшего покрытия
    if (item.type === 'removed') {
      return `  - ${item.key}: ${item.value}`;
    }
    if (item.type === 'added') {
      return `  + ${item.key}: ${item.value}`;
    }
    if (item.type === 'changed') {
      return `  - ${item.key}: ${item.oldValue}\n  + ${item.key}: ${item.newValue}`;
    }
    // Все остальные случаи (включая 'unchanged')
    return `    ${item.key}: ${item.value}`;
  });

  return `{\n${lines.join('\n')}\n}`;
};

export default function genDiff(filepath1, filepath2) {
  const absolutePath1 = getAbsolutePath(filepath1);
  const absolutePath2 = getAbsolutePath(filepath2);

  const data1 = parse(absolutePath1);
  const data2 = parse(absolutePath2);

  const diff = buildDiff(data1, data2);
  return formatDiff(diff);
}
