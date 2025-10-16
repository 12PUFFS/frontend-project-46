const { test, expect } = require('@jest/globals');
const path = require('path');
const genDiff = require('../src/index.js').default;

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

// Существующие тесты...

// Тесты для JSON формата
test('compare nested JSON files with json format', () => {
  const file1 = getFixturePath('nested1.json');
  const file2 = getFixturePath('nested2.json');
  
  const result = genDiff(file1, file2, 'json');
  
  // Проверяем что результат - валидный JSON
  expect(() => JSON.parse(result)).not.toThrow();
  
  // Проверяем структуру JSON
  const parsed = JSON.parse(result);
  expect(Array.isArray(parsed)).toBe(true);
  
  // Проверяем что есть хотя бы один элемент с известными свойствами
  expect(parsed.length).toBeGreaterThan(0);
  expect(parsed[0]).toHaveProperty('key');
  expect(parsed[0]).toHaveProperty('type');
});

test('compare flat JSON files with json format', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  
  const result = genDiff(file1, file2, 'json');
  
  // Проверяем что результат - валидный JSON
  expect(() => JSON.parse(result)).not.toThrow();
  
  const parsed = JSON.parse(result);
  expect(Array.isArray(parsed)).toBe(true);
});