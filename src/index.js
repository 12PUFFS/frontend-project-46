import parseFile from './parsers.js';
import buildDiff from './buildDiff.js';
import stylish from './formatters/stylish.js';

export default function genDiff(filepath1, filepath2, format = 'stylish') {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);

  const diff = buildDiff(obj1, obj2);

  if (format === 'stylish') {
    return stylish(diff);
  }
  // здесь позже добавятся plain, json
  throw new Error(`Unknown format: ${format}`);
}
