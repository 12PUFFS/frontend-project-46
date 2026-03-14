import parseFile from './parsers.js';
import buildDiff from './buildDiff.js';
import getFormatter from './formatters/index.js';

export default function genDiff(filepath1, filepath2, format = 'stylish') {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);

  const diff = buildDiff(obj1, obj2);
  const formatter = getFormatter(format);

  return formatter(diff);
}
