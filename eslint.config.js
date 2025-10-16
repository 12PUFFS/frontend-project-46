module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'script', // Изменяем на 'script' для CommonJS
    },
    rules: {
      'no-unused-vars': 'error',
      'no-console': 'off',
      'semi': ['error', 'never'],
      'indent': ['error', 2],
      'eol-last': ['error', 'always'],
      'no-trailing-spaces': 'error',
      'comma-dangle': ['error', 'always-multiline'],
      'arrow-parens': ['error', 'always'],
      'brace-style': ['error', '1tbs', { allowSingleLine: false }],
    },
  },
]
