export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        jest: 'readonly',
      },
    },
    rules: {
      // Отключаем ВСЕ правила
      '*': 'off',
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'no-console': 'off',
    },
    ignores: ['coverage/**', 'node_modules/**'],
  },
];
