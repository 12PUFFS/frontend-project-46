module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/extensions': ['error', 'ignorePackages', { js: 'always' }],
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': ['error', { allow: ['__filename', '__dirname'] }],
    'no-trailing-spaces': 'error',
    'global-require': 'off',
    'arrow-parens': ['error', 'always'],
    'object-curly-newline': ['error', { multiline: true }],
    'import/no-unresolved': 'off', // Отключаем для vitest.config.js
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.json'],
      },
    },
  },
};
