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

Cypress.Commands.add('fillNewContactForm',(testType,contactType,customerNumber,firstName,lastName,oPhone,mPhone,hPhone,pEmail,sEmail)=>{
    cy.findByLabelText('Contact Type').select(contactType);
    cy.findByLabelText('Customer Number').type(customerNumber);
    cy.findByLabelText('First Name').type(firstName);
    cy.findByLabelText('Last Name').type(lastName);
    cy.findByLabelText('Office Phone').type(oPhone);
    cy.findByLabelText('Mobile Phone').type(mPhone);
    cy.findByLabelText('Home Phone').type(hPhone);
    cy.findByLabelText('Primary Email').type(pEmail);
    cy.findByLabelText('Secondary Email').type(sEmail);
    cy.findByText("Save").click();
    if(testType=='Invalid Characters'){
        cy.findAllByRole('alert').should()
    }
    

})