const { test, expect } = require('@jest/globals');
const path = require('path');
const genDiff = require('../src/index.js').default;

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

// JSON тесты
test('compare flat JSON files', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  
  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(genDiff(file1, file2)).toBe(expected);
});

test('compare identical JSON files', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file1.json');
  
  const expected = `{
    follow: false
    host: hexlet.io
    proxy: 123.234.53.22
    timeout: 50
}`;

  expect(genDiff(file1, file2)).toBe(expected);
});

// YAML тесты
test('compare flat YAML files', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  
  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(genDiff(file1, file2)).toBe(expected);
});

test('compare identical YAML files', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file1.yml');
  
  const expected = `{
    follow: false
    host: hexlet.io
    proxy: 123.234.53.22
    timeout: 50
}`;

  expect(genDiff(file1, file2)).toBe(expected);
});

// Смешанные форматы
test('compare JSON and YAML files', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.yml');
  
  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(genDiff(file1, file2)).toBe(expected);
});