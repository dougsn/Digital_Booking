/* eslint-disable */
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "p8qsjk",
  // reporter: 'mochawesome',
  // reporterOptions: {
  //   reportDir: 'cypress/results',
  //   overwrite: false,
  //   html: false,
  //   json: true,
  // },

  reporter: "junit",
  reporterOptions: {
    mochaFile: "cypress/results/test-result-[hash].xml",
    toConsole: false,
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://devbackend.g7.ctdprojetos.com.br/",
  },
});