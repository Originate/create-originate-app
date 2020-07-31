module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', '<rootDir>'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
      diagnostics: {
        warnOnly: true,
        ignoreCodes: [151001],
      },
    },
  },
  testPathIgnorePatterns: ['/node_modules/', '/ignored/'],
};
