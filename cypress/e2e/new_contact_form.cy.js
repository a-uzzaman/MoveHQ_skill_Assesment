/// <reference types="cypress" />
const testData= require("../fixtures/basicTestData.json")

describe("All test cases related to new contact page", ()=>{

    testData.forEach((element) => {
        if(element.TestName.includes('happy')){
            it(element.TestName, ()=>{
                cy.visit('/');
                cy.findByLabelText("First Name").type(element.firstName);
                cy.findByLabelText("Last Name").type(element.lastName);
                cy.findByLabelText("Phone").type(element.mPhone);
                cy.findByLabelText("Email Address").type(element.pEmail);
            })
        }else if(element.TestName.includes('required')){
            it(element.TestName, ()=>{
                cy.visit('/');
                cy.findByLabelText("Last Name").type(element.lastName);

            })
        }else {
            it(element.TestName, ()=>{
                cy.visit('/');
                cy.findByLabelText("First Name").type(element.firstName);
                cy.findByLabelText("Last Name").type(element.lastName);
                cy.findByLabelText("Phone").type(element.mPhone);
                cy.findByLabelText("Email Address").type(element.pEmail);
            })
        }


    });
})