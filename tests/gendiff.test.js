import { test, expect } from 'vitest';
import { join, dirname } from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

// Функция для нормализации символов новой строки
const normalizeLineEndings = (str) => str.replace(/\r\n/g, '\n').trim();

test('gendiff json', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const expected = normalizeLineEndings(readFile('expected_stylish.txt'));

  expect(normalizeLineEndings(genDiff(filepath1, filepath2))).toEqual(expected);
  expect(normalizeLineEndings(genDiff(filepath1, filepath2, 'stylish'))).toEqual(expected);
});

test('gendiff yml', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yml');
  const expected = normalizeLineEndings(readFile('expected_stylish.txt'));

  expect(normalizeLineEndings(genDiff(filepath1, filepath2))).toEqual(expected);
  expect(normalizeLineEndings(genDiff(filepath1, filepath2, 'stylish'))).toEqual(expected);
});

test('gendiff plain format', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const expected = normalizeLineEndings(readFile('expected_plain.txt'));

  expect(normalizeLineEndings(genDiff(filepath1, filepath2, 'plain'))).toEqual(expected);
});

test('gendiff json format', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const result = genDiff(filepath1, filepath2, 'json');
  
  expect(() => JSON.parse(result)).not.toThrow();
});

test('gendiff nested files', () => {
  const filepath1 = getFixturePath('nested1.json');
  const filepath2 = getFixturePath('nested2.json');
  const expected = normalizeLineEndings(readFile('expected_nested.txt'));

  expect(normalizeLineEndings(genDiff(filepath1, filepath2))).toEqual(expected);
  expect(normalizeLineEndings(genDiff(filepath1, filepath2, 'stylish'))).toEqual(expected);
});