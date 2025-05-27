const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  video: false,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome-report',
    overwrite: false,
    html: true,
    json: true,
    timestamp: 'mmddyyyy_HHMMss'
  },
  e2e: {
    // baseUrl: 'http://localhost:4200',
    excludeSpecPattern: ['**/1-getting-started/*', '**//2-advanced-examples/*'],
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
     baseUrl: 'https://blockstream.info',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
