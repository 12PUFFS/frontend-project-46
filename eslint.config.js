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
      // Включаем правила, чтобы --fix мог их исправить
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'arrow-parens': ['error', 'always'],
      'operator-linebreak': ['error', 'before'],
      'no-extra-semi': 'error',
      'comma-dangle': ['error', 'always-multiline'],
      indent: ['error', 2],
      'space-before-function-paren': ['error', 'always'],
      'eol-last': ['error', 'always'],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'padded-blocks': ['error', 'never'],
      'quote-props': ['error', 'as-needed'],
    },
    ignores: ['coverage/**', 'node_modules/**'],
  },
];
