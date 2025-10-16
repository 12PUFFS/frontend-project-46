import { parseFile } from './parsers.js';
import getFormatter from './formatters/index.js';
import buildTree from './buildTree.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  const diff = buildTree(data1, data2);
  const format = getFormatter(formatName);
  
  return format(diff);
};

export default genDiff;