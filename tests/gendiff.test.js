import { test, expect } from 'vitest';
import { join, dirname } from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => {
  const path = getFixturePath(filename);
  console.log(`Reading file: ${path}`);
  return readFileSync(path, 'utf-8');
};

// Функция для нормализации символов новой строки
const normalizeLineEndings = (str) => str.replace(/\r\n/g, '\n').trim();

test('gendiff json', () => {
  console.log('Running gendiff json test');
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const expected = normalizeLineEndings(readFile('expected_stylish.txt'));

  const result = genDiff(filepath1, filepath2);
  console.log('Result length:', result.length);
  console.log('Expected length:', expected.length);
  console.log('Result === Expected:', result === expected);

  expect(normalizeLineEndings(result)).toEqual(expected);
  expect(normalizeLineEndings(genDiff(filepath1, filepath2, 'stylish'))).toEqual(expected);
});

test('gendiff yml', () => {
  console.log('Running gendiff yml test');
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yml');
  const expected = normalizeLineEndings(readFile('expected_stylish.txt'));

  const result = genDiff(filepath1, filepath2);
  console.log('Result length:', result.length);
  console.log('Expected length:', expected.length);
  console.log('Result === Expected:', result === expected);

  expect(normalizeLineEndings(result)).toEqual(expected);
  expect(normalizeLineEndings(genDiff(filepath1, filepath2, 'stylish'))).toEqual(expected);
});

test('gendiff plain format', () => {
  console.log('Running gendiff plain format test');
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const expected = normalizeLineEndings(readFile('expected_plain.txt'));

  const result = genDiff(filepath1, filepath2, 'plain');
  console.log('Result:', result);
  console.log('Expected:', expected);
  console.log('Result length:', result.length);
  console.log('Expected length:', expected.length);

  expect(normalizeLineEndings(result)).toEqual(expected);
});

test('gendiff json format', () => {
  console.log('Running gendiff json format test');
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const result = genDiff(filepath1, filepath2, 'json');
  
  console.log('JSON result:', result);
  expect(() => JSON.parse(result)).not.toThrow();
});

test('gendiff nested files', () => {
  console.log('Running gendiff nested files test');
  const filepath1 = getFixturePath('nested1.json');
  const filepath2 = getFixturePath('nested2.json');
  const expected = normalizeLineEndings(readFile('expected_nested.txt'));

  const result = genDiff(filepath1, filepath2);
  console.log('Result length:', result.length);
  console.log('Expected length:', expected.length);
  console.log('Result === Expected:', result === expected);

  expect(normalizeLineEndings(result)).toEqual(expected);
  expect(normalizeLineEndings(genDiff(filepath1, filepath2, 'stylish'))).toEqual(expected);
});