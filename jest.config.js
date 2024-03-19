// /** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */ This is depricated. Comment cause may be useful.
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: [ "/dist/" ]
  };