import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import genDiff from './src/index.js';

// Простые тестовые файлы
const simple1 = {
  "host": "hexlet.io",
  "timeout": 50
};

const simple2 = {
  "host": "hexlet.io", 
  "timeout": 20,
  "verbose": true
};

// Сохраним их временно
writeFileSync('test1.json', JSON.stringify(simple1, null, 2));
writeFileSync('test2.json', JSON.stringify(simple2, null, 2));

// Протестируем
console.log('=== ТЕСТ ПРОСТЫХ ФАЙЛОВ ===');
const result = genDiff('test1.json', 'test2.json', 'stylish');
console.log('Наш вывод:');
console.log(result);

console.log('\nОжидаемый вывод:');
console.log(`{
  host: hexlet.io
- timeout: 50
+ timeout: 20
+ verbose: true
}`);

// Проверим отступы
console.log('\n=== АНАЛИЗ ОТСТУПОВ ===');
const lines = result.split('\n');
lines.forEach(line => {
  if (line.trim()) {
    const spaces = line.length - line.trimStart().length;
    console.log(`"${line}" - ${spaces} пробелов`);
  }
});

// Удалим временные файлы
import { unlinkSync } from 'fs';
unlinkSync('test1.json');
unlinkSync('test2.json');