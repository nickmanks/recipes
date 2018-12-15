const config = require('@nearmap/jest-config');

module.exports = {
  ...config,

  setupFiles: [
    ...config.setupFiles,
    '<rootDir>/src/testing/setup.js'
  ],

  collectCoverageFrom: ['src/**/*.js', '!src/**/*.story.js'],

  setupTestFrameworkScriptFile: '<rootDir>/src/testing/setup-framework.js',

  moduleNameMapper: {
    '^.*\\.scss$': '<rootDir>/src/testing/mock-scss.js'
  },

  transform: {
    ...config.transform,
    '^.*\\.(png|gif|svg)$': '<rootDir>/src/testing/mock-file.js'
  },

  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(ol|oidc-client-react|refocus|cesium)/).*'
  ],

  globals: {
    ...config.globals,
    STORYBOOK_IMPORT_ENV: 'jest'
  }
};
