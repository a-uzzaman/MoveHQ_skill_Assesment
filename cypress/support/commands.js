import '@testing-library/cypress/add-commands';
// import '@faker-js/faker';

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


//This is a custom command I created to fill out the form by passing just the values
Cypress.Commands.add('fillNewContactFormWithAllFields',(contactType,customerNumber,firstName,lastName,oPhone,mPhone,hPhone,pEmail,sEmail)=>{
    // used if statement to not enter any data if there is no value being passed for a field
    if(contactType!=""){
        cy.findByLabelText('Contact Type').select(contactType);
    }
    if(customerNumber!=""){
        cy.findByLabelText('Customer Number').type(customerNumber);
    }
    if(firstName!=""){
        cy.findByLabelText('First Name').type(firstName);
    }
    if(lastName!=""){
        cy.findByLabelText('Last Name').type(lastName);
    }
    if(oPhone!=""){
        cy.findByLabelText('Office Phone').type(oPhone);
    }
    if(mPhone!=""){
        cy.findByLabelText('Mobile Phone').type(mPhone);
    }
    if(hPhone!=""){
        cy.findByLabelText('Home Phone').type(hPhone);
    }
    if(pEmail!=""){
        cy.findByLabelText('Primary Email').type(pEmail);
    }
    if(sEmail!=""){
        cy.findByLabelText('Secondary Email').type(sEmail);
    }
   
    cy.findByText("Save").click();

})

//These 2 custom commands were created to help find elements by entering the data-test attribute value
Cypress.Commands.add('getBySel', (selector, ...args) => {
    return cy.get(`[data-test=${selector}]`, ...args)
  })
  
  Cypress.Commands.add('getBySelLike', (selector, ...args) => {
    return cy.get(`[data-test*=${selector}]`, ...args)
  })

  // This command was created to fill out the form by passing only the value and using the data-test selector value
Cypress.Commands.add('fillNewContactFormWithAllFieldsWithSelectors',(contactType,customerNumber,firstName,lastName,oPhone,mPhone,hPhone,pEmail,sEmail)=>{
    if(contactType!=""){
        cy.getBySel('Contact-Type').select(contactType);
    }
    if(customerNumber!=""){
        cy.getBySel('Customer-Number').type(customerNumber);
    }
    if(firstName!=""){
        cy.getBySel('First-Name').type(firstName);
    }
    if(lastName!=""){
        cy.getBySel('Last-Name').type(lastName);
    }
    if(oPhone!=""){
        cy.getBySel('Office-Phone').type(oPhone);
    }
    if(mPhone!=""){
        cy.getBySel('Mobile-Phone').type(mPhone);
    }
    if(hPhone!=""){
        cy.getBySel('Home-Phone').type(hPhone);
    }
    if(pEmail!=""){
        cy.getBySel('Primary-Email').type(pEmail);
    }
    if(sEmail!=""){
        cy.getBySel('Secondary-Email').type(sEmail);
    }
   
    cy.findByText("Save").click();

})

//This command was created to validate error messages for the form due to invalid character or missing required field
Cypress.Commands.add("validateErrorsNewContactForms",(testType)=>{
    const allAlertMessages= cy.findAllByRole('alert');
    if(testType.includes('Invalid Characters')){
        expect(allAlertMessages).includes("Name field only accepts alphabet charactors"|
        "Phone number can only accept numbers and the following characters: -,),(,+"|
        "Email needs to be a valid email address"|
        "Customer number can only be integer values")
    }
    if(testType.includes('missing required fields')){
        expect(allAlertMessages).includes("Last Name Field cannot be empty"|
        "Contact type field cannot be empty"|
        "Email needs to be a valid email address"|
        "Assigned to field cannot be empty"|
        "Agent owner cannot be empty")
    }
})


// const jsonAssertion = require("soft-assert")

// Cypress.Commands.add('softAssert', (actual, expected, message) => {
//   jsonAssertion.softAssert(actual, expected, message)
//   if (jsonAssertion.jsonDiffArray.length) {
//     jsonAssertion.jsonDiffArray.forEach(diff => {

//       const log = Cypress.log({
//         name: 'Soft assertion error',
//         displayName: 'softAssert',
//         message: diff.error.message
//       })
    
//     })
//   }
// });

// This command was created to validate the contact data on the contact details page matches with the
//data used to create the contact
Cypress.Commands.add("validateContactDataDisplayedCorrectly",(testData)=>{

    expect(cy.getBySel('contact-type')).to.contain(testData.contactType)
    expect(cy.getBySel('customer-number')).to.contain(testData.contactType)
    expect(cy.getBySel('first-name')).to.contain(testData.contactType)
    expect(cy.getBySel('last-name')).to.contain(testData.contactType)
    expect(cy.getBySel('office-phone')).to.contain(testData.contactType)
    expect(cy.getBySel('mobile-phone')).to.contain(testData.contactType)
    expect(cy.getBySel('home-phone')).to.contain(testData.contactType)
    expect(cy.getBySel('primary-email')).to.contain(testData.contactType)
    expect(cy.getBySel('secondary-email')).to.contain(testData.contactType)


})

//This method was used to validate that newly created contact information matches from the database
//by passing the testdata, API endpoint and the request method type ie. GET, POST, PUT, DELETE, etc.
Cypress.Commands.add("usingApiToValidateNewContactSubmition",(testData,APIUrl,reqMethodType)=>{
    cy.request({
        method: reqMethodType,
        url: APIUrl,
        failOnStatusCode: false,
    }).as('details');
    //Validate status code
    cy.get('@details').its('status').should('eq', 200)
    cy.get('@details').then((response) => {
        cy.log(JSON.stringify(response.body))
    });
    // Store response Json in an ibject
    const resData= cy.get('@details').then((response) => {
        return response.json();
    });
    //Validate data according to the test name
    if(testData.TestName.includes('required')){
        expect(resData.contactType).to.eq(testData.contactType);
        expect(resData.lastName).to.eq(testData.lastName);
    }else{
        expect(resData.contactType).to.eq(testData.contactType);
        expect(resData.firstName).to.eq(testData.firstName);
        expect(resData.lastName).to.eq(testData.lastName);
        expect(resData.oPhone).to.eq(testData.oPhone);
        expect(resData.mPhone).to.eq(testData.mPhone);
        expect(resData.hPhone).to.eq(testData.hPhone);
        expect(resData.pEmail).to.eq(testData.pEmail);
        expect(resData.sEmail).to.eq(testData.sEmail);
    }

    
})
//Command to generate random test data for new contacts where you need put the number of contacts you want to create in line 201
// Cypress.Commands.add("generateTestData", ()=>{
        
//     const faker = require('@faker-js/faker');

//     cy.writeFile('cypress/fixtures/new_contacts_randomly_generated.json', {
//      //times is the number of records that will be created
//       'hits':Cypress._.times(20, () => {
//         return {
//           'TestName':'Testing with random data generated successful submition with all fields',
//         //   'customerNumber': `${faker.datatype.number()}`,
//           'firstName':`${faker.name.firstName()}`,
//           'lastName':`${faker.name.lastName()}`,
//           'contactType':'Transferee',
//           'oPhone': `${faker.phone.number('###-###-###')}`,
//           'mPhone': `${faker.phone.number('+48 91 ### ## ##')}`,
//           'hPhone': `${faker.phone.number()}`,
//           'pEmail': `${faker.internet.email()}`,
//           'sEmail': `${faker.internet.email()}`
//         }
//       })
//     })
//   })
