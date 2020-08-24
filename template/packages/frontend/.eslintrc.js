module.exports = {
  extends: ['../.eslintrc.base.js', 'plugin:react/recommended'],
  parserOptions: {
    project: './tsconfig.json',
  },
  env: {
    browser: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/display-name': 0,
    'react/prop-types': 0
  },
};
