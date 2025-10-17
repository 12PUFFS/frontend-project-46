import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import genDiff from './src/index.js';

// Создадим точные копии тестовых файлов как в Hexlet
const file1Content = `{
  "common": {
    "setting1": "Value 1",
    "setting2": 200,
    "setting3": true,
    "setting6": {
      "key": "value",
      "doge": {
        "wow": "too much"
      }
    }
  },
  "group1": {
    "baz": "bas",
    "foo": "bar",
    "nest": {
      "key": "value"
    }
  },
  "group2": {
    "abc": 12345,
    "deep": {
      "id": 45
    }
  }
}`;

const file2Content = `{
  "common": {
    "follow": false,
    "setting1": "Value 1",
    "setting3": {
      "key": "value"
    },
    "setting4": "blah blah",
    "setting5": {
      "key5": "value5"
    },
    "setting6": {
      "key": "value",
      "ops": "vops",
      "doge": {
        "wow": "so much"
      }
    }
  },
  "group1": {
    "foo": "bar",
    "baz": "bars",
    "nest": "str"
  },
  "group3": {
    "deep": {
      "id": {
        "number": 45
      }
    },
    "fee": 100500
  }
}`;

writeFileSync('debug1.json', file1Content);
writeFileSync('debug2.json', file2Content);

console.log('=== РЕАЛЬНЫЙ ВЫВОД НАШЕЙ ПРОГРАММЫ ===');
const result = genDiff('debug1.json', 'debug2.json', 'stylish');
console.log(result);

// Сохраним вывод в файл для анализа
writeFileSync('our_output.txt', result);

console.log('\n=== ВЫВОД СОХРАНЕН В our_output.txt ===');
console.log('Теперь сравните с ожидаемым форматом в тестах Hexlet');

// Удалим временные файлы
import { unlinkSync } from 'fs';
unlinkSync('debug1.json');
unlinkSync('debug2.json');