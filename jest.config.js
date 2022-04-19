module.exports = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testPathIgnorePatterns: ['<rootDir>/.next/','<rootDir>/src/', '<rootDir>/node_modules/', '<rootDir>/coverage', '<rootDir>/dist'],
    moduleDirectories: ["node_modules", "pages"],
    moduleNameMapper: {
      '@pages/(.*)': '<rootDir>/pages/$1',
      '@styles/(.*)': '<rootDir>/styles/$1',
      '^.+\\.(css|less|scss)$': 'identity-obj-proxy'
    },
    coverageDirectory: 'coverage',
    collectCoverage: true,
    coverageReporters: ["lcov"],
    collectCoverageFrom: ['/**/*.{js,jsx,ts,tsx}', 'pages/**/*.{js,jsx,ts,tsx}'],
    coverageThreshold: {
      global: {
        branches: 0,
        functions: 0,
        lines: 0,
        statements: 0,
      },
    },
  };