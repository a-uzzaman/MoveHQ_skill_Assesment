/// <reference types="cypress" />
const testData= require("../fixtures/example.json")

describe("All test cases related to new contact page", ()=>{

    testData.forEach((element) => {
        it('Test invalid inputs', ()=>{
            cy.visit('/');
            cy.findByLabelText("First Name")
            .type(element.FirstName);
        })

    });
})