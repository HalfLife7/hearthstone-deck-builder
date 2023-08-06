/* eslint-env node */
module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    moduleFileExtensions: ['js', 'jsx', 'json'],
    testMatch: ['<rootDir>/src/**/*.test.(js|jsx)'],
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "identity-obj-proxy"
    },
};