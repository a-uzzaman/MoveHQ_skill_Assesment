/// <reference types="cypress" />

// To use Test data json file in test
const testData= require("../fixtures/basicTestData.json")

describe("All test cases related to new contact page", ()=>{

    before(()=>{
        //Assuming new contact url will be ending with new-contact
        cy.visit('/');
    }) 

    //Line 14 is to loop through the array of test data
    testData.forEach((element) => {

        //Check for type of test it is from the TestName property and run test accordingly
        if(element.TestName.includes('happy')){
            
            //Using the TestName property to set the test name for the specific test
            it(element.TestName, ()=>{

                //Using custom command to to fill out the form using the test data
                cy.fillNewContactFormWithAllFieldsWithSelectors(element.contactType,element.customerNumber,element.firstName,element.lastName,element.oPhone,element.mPhone,element.hPhone,element.pEmail,element.sEmail);
                
                //Assuming there is a success message verify the message
                cy.getBySel('success-message')
                .then((message)=>{
                    expect(message).to.contain("Success new contact saved")
                })

                //Assuming there is a page that displays customer information
                cy.getBySel('customer-list').click()

                //Assuming customer number is unique and a link to get to the details page
                cy.getBySel(element.customerNumber).click()

                //This command will validate the UI displayed data matches the test data used to create contact.
                cy.validateContactDataDisplayedCorrectly(element)

                /*Assuming that there is API to retreive specific contact data using customer number as the unique identifier
                  we can retrieve the data from the database using the API. 
                  Then the custom command will validate the data was stored correctly
                
                  */
                cy.usingApiToValidateNewContact(element,"/contact/"+element.customerNumber)
            })
        }else if(element.TestName.includes('required')){
            it(element.TestName, ()=>{
                cy.fillNewContactFormWithAllFieldsWithSelectors(element.contactType,element.customerNumber,element.firstName,element.lastName,element.oPhone,element.mPhone,element.hPhone,element.pEmail,element.sEmail);
                cy.usingApiToValidateNewContact(element,"/contact/"+element.customerNumber)

            })
        }else {
            it(element.TestName, ()=>{
                cy.fillNewContactFormWithAllFieldsWithSelectors(element.contactType,element.customerNumber,element.firstName,element.lastName,element.oPhone,element.mPhone,element.hPhone,element.pEmail,element.sEmail);
                //Verify correct error message is displayed
                cy.validateErrorsNewContactForms(element.TestName);
            })
        }


    });
})