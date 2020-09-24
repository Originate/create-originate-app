module.exports = {
  plugins: ['react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:promise/recommended',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
  ],
  env: {
    jest: true,
    es6: true,
  },
  ignorePatterns: ['ignored'],
  rules: {
    'prettier/prettier': 2,
    'jest/no-jasmine-globals': 'error',
    'react/prop-types': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
      ],
      rules: {
        '@typescript-eslint/no-floating-promises': 2,
        '@typescript-eslint/require-await': 0,
        '@typescript-eslint/unbound-method': 2,
        '@typescript-eslint/no-triple-slash-reference': 0,
        '@typescript-eslint/camelcase': 0,
        '@typescript-eslint/no-parameter-properties': 0,
        '@typescript-eslint/explicit-member-accessibility': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/indent': 0,
        '@typescript-eslint/no-use-before-define': 0,
        '@typescript-eslint/no-namespace': 0,
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/ban-types': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
      },
    },
  ],
};
