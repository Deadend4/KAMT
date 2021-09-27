module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-tabs': 'off',
    'react/jsx-props-no-spreading': 'off',
    'eslint linebreak-style': [0, 'error', 'windows'],
    'linebreak-style': 0,
    'global-require': 0,
  },
  ignorePatterns: ['/src/index.js'],
};
