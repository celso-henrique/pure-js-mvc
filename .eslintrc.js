module.exports = {
  parser: 'babel-eslint',
  env: {
    es6: true,
    jest: true,
    browser: true,
    node: true
  },
  extends: ['eslint:recommended'],
  rules: {
    indent: 'off',
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: [2, 'always'],
    'no-console': 'off'
  }
};
