const { test, expect } = require('@jest/globals')
const { join } = require('path')
const genDiff = require('../src/index')

const getFixturePath = filename => join(__dirname, '..', '__fixtures__', filename)

test('genDiff flat JSON files', () => {
  const filepath1 = getFixturePath('file1.json')
  const filepath2 = getFixturePath('file2.json')

  const result = genDiff(filepath1, filepath2)

  expect(result).toContain('  - follow: false')
  expect(result).toContain('  host: hexlet.io')
  expect(result).toContain('  - proxy: 123.234.53.22')
  expect(result).toContain('  - timeout: 50')
  expect(result).toContain('  + timeout: 20')
  expect(result).toContain('  + verbose: true')
})

test('genDiff with identical JSON files', () => {
  const filepath1 = getFixturePath('file1.json')
  const filepath2 = getFixturePath('file1.json')

  const result = genDiff(filepath1, filepath2)

  expect(result).toContain('  follow: false')
  expect(result).toContain('  host: hexlet.io')
  expect(result).toContain('  proxy: 123.234.53.22')
  expect(result).toContain('  timeout: 50')
})

test('genDiff flat YAML files', () => {
  const filepath1 = getFixturePath('file1.yml')
  const filepath2 = getFixturePath('file2.yml')

  const result = genDiff(filepath1, filepath2)

  expect(result).toContain('  - follow: false')
  expect(result).toContain('  host: hexlet.io')
  expect(result).toContain('  - proxy: 123.234.53.22')
  expect(result).toContain('  - timeout: 50')
  expect(result).toContain('  + timeout: 20')
  expect(result).toContain('  + verbose: true')
})
