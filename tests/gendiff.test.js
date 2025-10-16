const { test, expect } = require('@jest/globals');
const path = require('path');
const genDiff = require('../src/index.js').default;

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

// Существующие тесты для плоских структур...

// Новые тесты для вложенных структур
test('compare nested JSON files', () => {
  const file1 = getFixturePath('nested1.json');
  const file2 = getFixturePath('nested2.json');
  
  const expected = `{
    common: {
        follow: false
      setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
      setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
          key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
      deep: {
            id: 45
        }
    }
  + group3: {
        fee: 100500
      deep: {
            id: {
                number: 45
            }
        }
    }
}`;

  expect(genDiff(file1, file2)).toBe(expected);
});

test('compare nested YAML files', () => {
  const file1 = getFixturePath('nested1.yml');
  const file2 = getFixturePath('nested2.yml');
  
  const expected = `{
    common: {
        follow: false
      setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
      setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
          key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
      deep: {
            id: 45
        }
    }
  + group3: {
        fee: 100500
      deep: {
            id: {
                number: 45
            }
        }
    }
}`;

  expect(genDiff(file1, file2)).toBe(expected);
});