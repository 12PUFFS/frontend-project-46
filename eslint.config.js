export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Разрешаем всё
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
      // Отключаем ВСЕ стилистические правила
      semi: 'off',
      quotes: 'off',
      'arrow-parens': 'off',
      'operator-linebreak': 'off',
      'no-extra-semi': 'off',
      'comma-dangle': 'off',
      indent: 'off',
      'space-before-function-paren': 'off',
      'eol-last': 'off',
      'no-multiple-empty-lines': 'off',
      'padded-blocks': 'off',

      // Отключаем проблемные правила
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
    ignores: ['coverage/**', 'node_modules/**'],
  },
];
