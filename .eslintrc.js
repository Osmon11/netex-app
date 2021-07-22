module.exports = {
  extends: '@react-native-community',
  rules: {
    'jsx-quotes': [1, 'prefer-double'],
    'no-console': 1,
    'no-debugger': 1,
    'react-hooks/exhaustive-deps': 'warn',
    'no-const-assign': 'warn',
    'no-this-before-super': 'warn',
  },
  env: {
    browser: false,
    commonjs: true,
    es6: true,
    node: true,
  },
};
