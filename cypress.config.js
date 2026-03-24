const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://the-internet.herokuapp.com',
    defaultCommandTimeout: 5000,
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
