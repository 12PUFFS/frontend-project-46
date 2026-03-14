import parseFile from './parsers.js';

export default function genDiff(filepath1, filepath2) {
  const parsedFile1 = parseFile(filepath1);
  const parsedFile2 = parseFile(filepath2);

  const keysFile1 = Object.keys(parsedFile1);
  const keysFile2 = Object.keys(parsedFile2);

  const allKeys = [...keysFile1, ...keysFile2];
  const uniqKeys = [...new Set(allKeys)];
  const sortedKeys = uniqKeys.sort();

  let lines = [];

  for (const key of sortedKeys) {
    const value1 = parsedFile1[key];
    const value2 = parsedFile2[key];

    if (key in parsedFile1 && !(key in parsedFile2)) {
      lines.push(`  - ${key}: ${value1}`);
    } else if (!(key in parsedFile1) && key in parsedFile2) {
      lines.push(`  + ${key}: ${value2}`);
    } else if (key in parsedFile1 && key in parsedFile2) {
      if (value1 !== value2) {
        lines.push(`  - ${key}: ${value1}`);
        lines.push(`  + ${key}: ${value2}`);
      } else {
        lines.push(`    ${key}: ${value1}`);
      }
    }
  }

  return `{\n${lines.join('\n')}\n}`;
}
