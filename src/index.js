import fs from 'fs';
import path from 'path';

// Парсинг файла
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

// Поиск различий между двумя объектами
const findDiff = (obj1, obj2) => {
  // Получаем все ключи из обоих объектов и сортируем
  const keys = Object.keys({ ...obj1, ...obj2 }).sort();

  const diff = keys.map((key) => {
    if (!(key in obj1)) {
      // Ключ только во втором файле (добавлен)
      return { key, type: 'added', value: obj2[key] };
    }
    if (!(key in obj2)) {
      // Ключ только в первом файле (удалён)
      return { key, type: 'removed', value: obj1[key] };
    }
    if (obj1[key] !== obj2[key]) {
      // Ключ есть в обоих файлах, но значения разные
      return { key, type: 'changed', oldValue: obj1[key], newValue: obj2[key] };
    }
    // Ключ есть в обоих файлах и значения совпадают
    return { key, type: 'unchanged', value: obj1[key] };
  });

  return diff;
};

// Форматирование результата
const formatDiff = (diff) => {
  const lines = diff.map((item) => {
    switch (item.type) {
      case 'removed':
        return `  - ${item.key}: ${item.value}`;
      case 'added':
        return `  + ${item.key}: ${item.value}`;
      case 'changed':
        return `  - ${item.key}: ${item.oldValue}\n  + ${item.key}: ${item.newValue}`;
      case 'unchanged':
        return `    ${item.key}: ${item.value}`;
      default:
        return '';
    }
  });

  return `{\n${lines.join('\n')}\n}`;
};

// Основная функция
export default function genDiff(filepath1, filepath2) {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  const diff = findDiff(data1, data2);
  return formatDiff(diff);
}
