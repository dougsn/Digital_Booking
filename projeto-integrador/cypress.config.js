import { defineConfig } from "cypress";

export default defineConfig({
  reporter: "junit",
  reporterOptions: {
    mochaFile: "cypress/results/test-result-[hash].xml",
    toConsole: false,
  },
  experimentalStudio: true,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:4173/home',

    "env": {
      "USER_EMAIL": "${USER_EMAIL}",
      "USER_PASSWORD": "${USER_PASSWORD}",
      "EMAIL": "maria@teste.com",
      "PASSWORD": "123456"
    }

  },
});
