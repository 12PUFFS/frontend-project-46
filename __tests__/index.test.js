import { describe, it, expect } from 'vitest';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('gendiff', () => {
  it('should compare two flat json files', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');

    const result = genDiff(file1, file2);

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

  it('should handle identical files', () => {
    const file1 = getFixturePath('file1.json');

    const result = genDiff(file1, file1);

    const data = JSON.parse(fs.readFileSync(file1, 'utf-8'));
    const keys = Object.keys(data);

    keys.forEach((key) => {
      expect(result).toContain(`    ${key}: ${data[key]}`);
    });

    expect(result).not.toContain('  +');
    expect(result).not.toContain('  -');
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
});
