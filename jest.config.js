module.exports = {
  verbose: true,
  rootDir: '.',
  testRegex: './test/.*.spec.ts$',
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  setupFiles: ['./test/common/ExposeEnv.ts'],
  moduleNameMapper: {
    '@core/(.*)$': '<rootDir>/src/core/$1',
    '@infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
    '@application/(.*)$': '<rootDir>/src/application/$1',
    '@test/(.*)$': '<rootDir>/test/$1',
  },
  moduleFileExtensions: ['js', 'ts'],
};
