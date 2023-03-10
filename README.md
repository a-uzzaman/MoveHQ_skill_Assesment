# **MoveHQ skill Assesment**

## **Description**
This is the skill assessment for MoveHQ SDET Lead position.This is an UI atomation project to test the submition of a form using cypress. Please run the test in CLI. I want to see if the [experiment-test.cy.js](cypress\e2e\experiment-test.cy.js) solution to use label text to locate the input field worked. Before running the test please update the baseURL with the URL for the form in the [cypress.config.js]() file. I am pretty sure the tests in [new_contatc_form-test.cy.js](cypress\e2e\new_contact_form-test.cy.js)
## **Pre-Requisites**
* Install [VSCode](https://code.visualstudio.com/download)
* Install [NodeJs](https://nodejs.org/en/download/)
* [Clone Project from GitHub](https://github.com/a-uzzaman/MoveHQ_skill_Assesment)

## **CLI Commands to run test**

* After cloning to local machine open folder of cloned project in VSCode. then open Terminal and run below CLI command to install all the dependency modules. You can find the dependencies in the [package.json](package.json) file
```
npm install
```

* To clean reports and screenshot folder before running test open terminal and enter the below command

```
npm run reports:clean
```
* To run test in headless from CLI

```
npm run cy:test
```
* To run test in headed from CLI

```
npm run cy:test:headed
```
* To run in cypress app
```
npm run cy:open
```
* To generate html report after test runs. Please be aware that the report will only generate if the test is run first. The report can be found in the [Reports](cypress/reports) folder after the test is run
```
npm run reports:generate
```

#### **Note:-** Script details for above can be found in [package.json](package.json) file.


##  **Folder Structure**
* cypress
    * [e2e](cypress/e2e) (Test case folder)
        * [new_contact_form-test](cypress/e2e/new_contact_form-test.cy.js) This file contains cypress tests for the following scenarios according to the [Test Data file](cypress\fixtures\basicTestData.json) 
            * Testing happy path submition with all fields
            * Testing submition with required fields
            * Testing failure to submit due to missing contact type
            * Testing failure to submit due to contact type other than Transferee contact type
            * Testing failure to submit due to invalid characters entered in input field
            * Testing failure to submit due to missing required fields
            * Testing happy path successful submition with different phone nuber format
        * **Note:-** Please be aware even though there is only 3 'it' Test methods in the spec test file it will run all scenarios according to the test data file. 
    * [fixtures](cypress/fixtures) (Folder for test data)
    * [support](cypress/support) (Folder for supporting files like custom commands)
        * [commands.js](cypress/support/commands.js) To understand the custom commands please see the comments in the commands.js file in the support folder
    * [reports](cypress/reports) (Folder to store all reports and will only appear after the test is run through cli)
    * [screenshots](cypress/screenshots) (Folder to store screenshots and will only appear after the test is run through cli if a test fails and a screenshot is taken)
* [node_modules](node_modules) (Folder where all the dependencie modules are stored)
* [.gitignore](.gitignore) (to ignore items that do not need to be pushed to source control)
* [Cypress.config.js](cypress.config.js) file has all the configuration setup for the e2e testing. The configuration include
    * baseURL
    * reporter
    * reporterOptions
* [package.json](package.json) (This file has all the configuaration related JavaScript project)


