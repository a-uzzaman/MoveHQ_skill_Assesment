const { defineConfig } = require("cypress");
const {mysql}= require('mysql');

module.exports = defineConfig({
  e2e: {
    baseUrl:'https://fs2.formsite.com/meherpavan/form2/',
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports/mochawesome-reports",
      overwrite: false,
      html: false,
      json: true,
      reportFilename: "[status]_[datetime]-[name]-report",
      timestamp: "longDate",
      embeddedScreenshots: true,
      inlineAssets: true
    },
    video: false,
    // setupNodeEvents(on,config){
    //   on('task', {
    //     queryTestDb(query, conConfig) {
    //       // creates a new mysql connection using credentials from cypress.json env's
    //       const connection = mysql.createConnection(conConfig.env.db)
    //       // start connection to db
    //       connection.connect()
    //       // exec query + disconnect to db as a Promise
    //       return new Promise((resolve, reject) => {
    //         connection.query(query, (error, results) => {
    //           if (error) reject(error)
    //           else {
    //             connection.end()
    //             return resolve(results)
    //           }
    //         })
    //       })
    //     }
    //   })
    // },
  }

});
