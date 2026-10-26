import { defineConfig } from 'cypress';
import * as fs from 'fs';
import neatCsv from 'neat-csv';
import path from 'path';

export default defineConfig({
  video: true,
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  viewportWidth: 1440,
  viewportHeight: 900,
  chromeWebSecurity: false,

  // Mochawesome rich HTML reporter configuration
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Enterprise Cypress E2E Automation Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    videoOnFailOnly: true,
    reportDir: 'cypress/reports/html',
  },

  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'https://ecommerce-playground.lambdatest.io/index.php',
    pageLoadTimeout: 120000,
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,

    setupNodeEvents(on, config) {
      // Register Cypress Mochawesome Reporter plugin
      require('cypress-mochawesome-reporter/plugin')(on);

      // Node event tasks for file handling & data-driven workflows
      on('task', {
        async readFileCSV(fileName: string) {
          const targetPath = path.isAbsolute(fileName) ? fileName : path.join(__dirname, fileName);
          if (!fs.existsSync(targetPath)) {
            throw new Error(`CSV file not found: ${targetPath}`);
          }
          const text = fs.readFileSync(targetPath, 'utf8');
          const parsedCsv = await neatCsv(text);
          return parsedCsv;
        },

        readFileforStorage(fileName: string) {
          const targetPath = path.isAbsolute(fileName) ? fileName : path.join(__dirname, fileName);
          if (!fs.existsSync(targetPath)) {
            return '';
          }
          return fs.readFileSync(targetPath, 'utf8');
        },

        writeFileCSV({ fileName, data }: { fileName: string; data: string }) {
          const targetPath = path.isAbsolute(fileName) ? fileName : path.join(__dirname, fileName);
          fs.writeFileSync(targetPath, data, 'utf8');
          return null;
        },
      });

      return config;
    },
  },
});
