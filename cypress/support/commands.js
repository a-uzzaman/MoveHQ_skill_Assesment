import '@testing-library/cypress/add-commands';

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

Cypress.Commands.add('fillNewContactFormWithAllFields',(contactType,customerNumber,firstName,lastName,oPhone,mPhone,hPhone,pEmail,sEmail)=>{
    if(contactType!=null){
        cy.findByLabelText('Contact Type').select(contactType);
    }
    if(customerNumber!=null){
        cy.findByLabelText('Customer Number').type(customerNumber);
    }
    if(firstName!=null){
        cy.findByLabelText('First Name').type(firstName);
    }
    if(lastName!=null){
        cy.findByLabelText('Last Name').type(lastName);
    }
    if(oPhone!=null){
        cy.findByLabelText('Office Phone').type(oPhone);
    }
    if(mPhone!=null){
        cy.findByLabelText('Mobile Phone').type(mPhone);
    }
    if(hPhone!=null){
        cy.findByLabelText('Home Phone').type(hPhone);
    }
    if(pEmail!=null){
        cy.findByLabelText('Primary Email').type(pEmail);
    }
    if(sEmail!=null){
        cy.findByLabelText('Secondary Email').type(sEmail);
    }
   
    cy.findByText("Save").click();

})

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

Cypress.Commands.add("validateNewContactCreatedThroughAPI",(testData,APIUrl)=>{
    cy.request({
        method: 'GET',
        url: APIUrl,
        failOnStatusCode: false,
    }).as('details');
    //Validate status code
    cy.get('@details').its('status').should('eq', 200)
    cy.get('@details').then((response) => {
        cy.log(JSON.stringify(response.body))
    });
    const resData= cy.get('@details').then((response) => {
        return response.json();
    });

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