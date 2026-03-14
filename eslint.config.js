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
    plugins: {
      '@stylistic': {
        rules: {
          semi: 'off',
          quotes: 'off',
          'arrow-parens': 'off',
          'operator-linebreak': 'off',
          'no-extra-semi': 'off',
          'comma-dangle': 'off',
          indent: 'off',
          'space-before-function-paren': 'off',
          'quote-props': 'off',
        },
      },
    },
    rules: {
      // Отключаем все stylistic правила
      '@stylistic/semi': 'off',
      '@stylistic/quotes': 'off',
      '@stylistic/arrow-parens': 'off',
      '@stylistic/operator-linebreak': 'off',
      '@stylistic/no-extra-semi': 'off',
      '@stylistic/comma-dangle': 'off',
      '@stylistic/indent': 'off',
      '@stylistic/space-before-function-paren': 'off',
      '@stylistic/quote-props': 'off',

      // Отключаем все остальные правила
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'no-console': 'off',
    },
  },
];
