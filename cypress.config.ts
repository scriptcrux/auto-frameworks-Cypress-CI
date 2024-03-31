// const { defineConfig } = require('cypress');
// const fs = require('fs');
// const neatCSV = require('neat-csv');
import { defineConfig } from 'cypress';
import * as fs from 'fs';
import neatCsv from 'neat-csv';
import path from 'path';

export default defineConfig({
  video: true,
  // videoCompression: true,
  // trashAssetsBeforeRuns: false,
  /*  
// for generating simple mocha report

 reporter: 'mochawesome',
  reporterOptions: {
    // overwrite: false,
    // html: false,
    // json: true,
    charts: true,
    reportFileName: 'e2e testing',
  },
   */
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'E2E Testing',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    videoOnFailOnly: true,
  },
  e2e: {
    // baseUrl: 'https://example.cypress.io',
    baseUrl: 'https://ecommerce-playground.lambdatest.io/index.php',
    pageLoadTimeout: 120000,
    async setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      // createe task to read from csv
      // const fileName = 'D:/FrondEnd/Testing/framework/cypress-e2e/cypress/fixtures/login.csv';
      // const fileName = path.join(__dirname, 'cypress/fixtures/login.csv');

      on('task', {
        async readFileCSV(fileName) {
          const text = fs.readFileSync(fileName, 'utf8');
          console.log('text=>', text);
          const csv = await neatCsv(text);
          console.log('loaded the users');
          console.log(csv);
          // config.env.usersList = csv;
          return csv;
        },
      });

      on('task', {
        async readFileforStorage(fileName) {
          const text = fs.readFileSync(fileName, 'utf8');
          console.log('text-storage==>', JSON.stringify(text));
          return text;
        },
      });

      on('task', {
        writeFileCSV({ fileName, data }) {
          console.log('%s, %s', fileName, data);

          const newfileName = path.join(__dirname, fileName);

          fs.writeFileSync(newfileName, data);
          return null;
        },
      });
    },
  },
});
