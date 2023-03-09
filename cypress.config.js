const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl:'https://fs2.formsite.com/meherpavan/form2/',
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      charts: true,
      reportPageTitle: "My Test Suite",
      embeddedScreenshots: true,
      inlineAssets: true
    },
  video: false,
    
  },
});
