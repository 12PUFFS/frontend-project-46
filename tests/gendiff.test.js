const { test, expect } = require('@jest/globals');
const path = require('path');
const genDiff = require('../src/index.js').default;

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

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

test('compare identical files', () => {
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