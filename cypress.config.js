const { defineConfig } = require('cypress');
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 5000,
    viewportWidth: 1280,
    viewportHeight: 720,

    setupNodeEvents(on, config) {
      // קורא את שם הסביבה מדגל --env configFile
      // דוגמה: npx cypress run --env configFile=staging
      const configFile = config.env.configFile || 'dev';
      const configPath = path.join(__dirname, 'cypress', 'config', `${configFile}.json`);

      if (fs.existsSync(configPath)) {
        const envConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        // ממזג את הקובץ עם הגדרות Cypress
        return { ...config, ...envConfig, env: { ...config.env, ...envConfig.env } };
      }

      return config;
    },
  },
});
