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
      // ОТКЛЮЧАЕМ ВСЕ СТИЛИСТИЧЕСКИЕ ПРАВИЛА
      '@stylistic/semi': 'off',
      '@stylistic/quotes': 'off',
      '@stylistic/arrow-parens': 'off',
      '@stylistic/operator-linebreak': 'off',
      '@stylistic/no-extra-semi': 'off',
      '@stylistic/comma-dangle': 'off',
      '@stylistic/indent': 'off',
      '@stylistic/space-before-function-paren': 'off',
      '@stylistic/quote-props': 'off',

      // ОТКЛЮЧАЕМ ВСЕ ОСТАЛЬНЫЕ ПРАВИЛА
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'no-console': 'off',
      'no-empty': 'off',
      'no-constant-condition': 'off',
      'no-prototype-builtins': 'off',
      'no-control-regex': 'off',
      'no-useless-escape': 'off',
      'no-inner-declarations': 'off',
    },
  },
];
