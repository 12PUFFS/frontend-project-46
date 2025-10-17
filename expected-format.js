const expected = `{
    common: {
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            key: value
          - doge: {
                wow: too much
            }
          + doge: {
                wow: so much
            }
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
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

console.log('=== ОЖИДАЕМЫЙ ФОРМАТ ===');
console.log(expected);

// Сохраним для сравнения
import { writeFileSync } from 'fs';
writeFileSync('expected_output.txt', expected);