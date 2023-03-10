/// <reference types="cypress" />

// To use Test data json file in test
const testData= require("../fixtures/basicTestData.json")

describe("This is test the new contact page", ()=>{

    testData.forEach((element) => {

        //Check for type of test it is from the TestName property and run test accordingly
        if(element.TestName.includes('happy')){
            
            //Using the TestName property to set the test name for the specific test
            it(element.TestName, ()=>{

                //Using custom command to to fill out the form using the test data
                cy.fillNewContactFormWithAllFieldsWithSelectors(element.contactType,element.customerNumber,element.firstName,element.lastName,element.oPhone,element.mPhone,element.hPhone,element.pEmail,element.sEmail);
            })
        }
    })

})
