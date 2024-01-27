module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  // If you have a specific tsconfig for tests
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  },
  // other configurations...
};
