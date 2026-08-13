import { describe, it, expect } from 'vitest';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('gendiff', () => {
  describe('stylish format', () => {
    describe('flat files', () => {
      it('should compare two flat json files', () => {
        const file1 = getFixturePath('file1.json');
        const file2 = getFixturePath('file2.json');

        const result = genDiff(file1, file2, 'stylish');

        const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

        expect(result).toBe(expected);
      });

      it('should compare two flat yaml files', () => {
        const file1 = getFixturePath('file1.yml');
        const file2 = getFixturePath('file2.yml');

        const result = genDiff(file1, file2, 'stylish');

        const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

        expect(result).toBe(expected);
      });
    });

    describe('nested files', () => {
      it('should compare nested json files', () => {
        const file1 = getFixturePath('file1_nested.json');
        const file2 = getFixturePath('file2_nested.json');

        const result = genDiff(file1, file2, 'stylish');

        const expected = `{
    common: {
      + follow: false
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
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

        expect(result).toBe(expected);
      });
    });
  });

  describe('plain format', () => {
    it('should compare flat json files', () => {
      const file1 = getFixturePath('file1.json');
      const file2 = getFixturePath('file2.json');

      const result = genDiff(file1, file2, 'plain');

      const expected = `Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true`;

      expect(result).toBe(expected);
    });

    it('should compare nested json files', () => {
      const file1 = getFixturePath('file1_nested.json');
      const file2 = getFixturePath('file2_nested.json');

      const result = genDiff(file1, file2, 'plain');

      const expected = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

      expect(result).toBe(expected);
    });
  });

  it('should handle empty objects', () => {
    const emptyFile = getFixturePath('empty.json');

    if (!fs.existsSync(emptyFile)) {
      fs.writeFileSync(emptyFile, '{}');
    }

    const result = genDiff(emptyFile, emptyFile);
    expect(result).toBe('{\n\n}');
  });

  it('should throw error for unsupported file format', () => {
    const unsupportedFile = getFixturePath('file1.txt');

    if (!fs.existsSync(unsupportedFile)) {
      fs.writeFileSync(unsupportedFile, 'test content');
    }

    expect(() => genDiff(unsupportedFile, unsupportedFile)).toThrow(
      'Unsupported file format: .txt',
    );
  });

  it('should work with absolute paths', () => {
    const file1 = getFixturePath('file1.json');
    const absolutePath = path.resolve(file1);

    const result = genDiff(absolutePath, absolutePath);

    const data = JSON.parse(fs.readFileSync(absolutePath, 'utf-8'));
    const keys = Object.keys(data);

    keys.forEach((key) => {
      expect(result).toContain(`    ${key}: ${data[key]}`);
    });

    expect(result).not.toContain('  +');
    expect(result).not.toContain('  -');
  });

  it('should work with relative paths', () => {
    const relativePath = '__fixtures__/file1.json';

    const result = genDiff(relativePath, relativePath);

    const absolutePath = getFixturePath('file1.json');
    const data = JSON.parse(fs.readFileSync(absolutePath, 'utf-8'));
    const keys = Object.keys(data);

    keys.forEach((key) => {
      expect(result).toContain(`    ${key}: ${data[key]}`);
    });

    expect(result).not.toContain('  +');
    expect(result).not.toContain('  -');
  });

  it('should handle empty diff', () => {
    const file1 = getFixturePath('file1.json');

    const result = genDiff(file1, file1);

    const data = JSON.parse(fs.readFileSync(file1, 'utf-8'));
    const keys = Object.keys(data);

    keys.forEach((key) => {
      expect(result).toContain(`    ${key}: ${data[key]}`);
    });

    expect(result).not.toContain('  -');
    expect(result).not.toContain('  +');
  });

  it('should throw error for unknown format', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');

    expect(() => genDiff(file1, file2, 'unknown')).toThrow('Unknown format: unknown');
  });
});
