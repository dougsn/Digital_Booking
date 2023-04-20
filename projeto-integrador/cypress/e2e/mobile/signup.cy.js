/// <reference types="Cypress" />

import faker from "faker";

describe('Esta suíte testa o fluxo de cadastro', function () {

    beforeEach(function () {
        cy.visit('/')
        cy.viewport('iphone-5')
    })

    Cypress._.times(10, () => {

        it('Deve fazer o cadastro com sucesso!', function () {
            const email = faker.internet.email()
            cy.get('.md\\:hidden > button > img').should('be.visible');
            cy.get('.md\\:hidden').click();
            cy.get('.flex-col > .my-2 > .text-dark-purple').should('be.visible').click();
            cy.get('#name').type(`${faker.name.firstName()}`)
            cy.get('#lastName').type(`${faker.name.lastName()}`)
            cy.get('#email').type(email)
            cy.get('#repeatEmail').type( email)
            cy.get('#password').type(`${faker.internet.password(6, true)}`)
            cy.get('div.text-center > .bg-green').should('be.visible').click();
            cy.contains('Usuário cadastrado com sucesso').should('be.visible')
        });
        
    })
    
    Cypress._.times(10, () => {

        it('Deve proibir fazer cadastro sem o primeiro nome', function () {
            const email = faker.internet.email()
            cy.get('.md\\:hidden > button > img').should('be.visible');
            cy.get('.md\\:hidden').click();
            cy.get('.flex-col > .my-2 > .text-dark-purple').should('be.visible').click();
            // cy.get('#name').type(`${faker.name.firstName()}`)
            cy.get('#lastName').type(`${faker.name.lastName()}`)
            cy.get('#email').type(email)
            cy.get('#repeatEmail').type( email)
            cy.get('#password').type(`${faker.internet.password(6, true)}`)
            cy.get('div.text-center > .bg-green').should('be.visible').click();
            cy.get('#name').should('be.visible');
            cy.get('.text-red-500').should('have.text', 'Este campo é obrigatório');
            cy.get('.text-red-500').should('be.visible');
        });
        
    })
    
    Cypress._.times(10, () => {

        it('Deve proibir fazer cadastro sem o sobrenome', function () {
            const email = faker.internet.email()
            cy.get('.md\\:hidden > button > img').should('be.visible');
            cy.get('.md\\:hidden').click();
            cy.get('.flex-col > .my-2 > .text-dark-purple').should('be.visible').click();
            cy.get('#name').type(`${faker.name.firstName()}`)
            //cy.get('#lastName').type(`${faker.name.lastName()}`)
            cy.get('#email').type(email)
            cy.get('#repeatEmail').type( email)
            cy.get('#password').type(`${faker.internet.password(6, true)}`)
            cy.get('div.text-center > .bg-green').should('be.visible').click();
            cy.get('.text-red-500').should('have.text', 'Este campo é obrigatório');
            cy.get('.text-red-500').should('be.visible');
        });

    })

    Cypress._.times(10, () => {

        it('Deve proibir fazer cadastro sem o email', function () {
            const email = faker.internet.email()
            cy.get('.md\\:hidden > button > img').should('be.visible');
            cy.get('.md\\:hidden').click();
            cy.get('.flex-col > .my-2 > .text-dark-purple').should('be.visible').click();
            cy.get('#name').type(`${faker.name.firstName()}`)
            cy.get('#lastName').type(`${faker.name.lastName()}`)
            //cy.get('#email').type(email)
            //cy.get('#repeatEmail').type( email)
            cy.get('#password').type(`${faker.internet.password(6, true)}`)
            cy.get('div.text-center > .bg-green').should('be.visible').click();
            cy.get('#name').should('be.visible');
            cy.get('.text-red-500').should('be.visible');
            cy.get(':nth-child(4) > .text-red-500').should('have.text', 'Este campo é obrigatório');
            cy.get(':nth-child(4) > .text-red-500').should('be.visible');
        });
        
    })

    Cypress._.times(10, () => {

        it('Deve proibir fazer cadastro com emails diferentes', function () {
            cy.get('.md\\:hidden > button > img').should('be.visible');
            cy.get('.md\\:hidden').click();
            cy.get('.flex-col > .my-2 > .text-dark-purple').should('be.visible').click();
            cy.get('#name').type(`${faker.name.firstName()}`)
            cy.get('#lastName').type(`${faker.name.lastName()}`)
            cy.get('#email').type(`${faker.internet.email()}`)
            cy.get('#repeatEmail').type( `${faker.internet.email()}`)
            cy.get('#password').type(`${faker.internet.password(6, true)}`)
            cy.get('div.text-center > .bg-green').should('be.visible').click();
            cy.get('#name').should('be.visible');
            cy.get('.text-red-500').should('be.visible');
            cy.get(':nth-child(5) > .text-red-500').should('have.text', 'Os e-mails devem ser iguais');
            cy.get(':nth-child(5) > .text-red-500').should('be.visible');
        });
        
    })

    Cypress._.times(10, () => {

        it('Deve proibir fazer cadastro sem senha', function () {
            const email = faker.internet.email()
    
            cy.get('.md\\:hidden > button > img').should('be.visible');
            cy.get('.md\\:hidden').click();
            cy.get('.flex-col > .my-2 > .text-dark-purple').should('be.visible').click();
            cy.get('#name').type(`${faker.name.firstName()}`)
            cy.get('#lastName').type(`${faker.name.lastName()}`)
            cy.get('#email').type(email)
            cy.get('#repeatEmail').type( email)
            //cy.get('#password').type(`${faker.internet.password(6)}`)
            cy.get('div.text-center > .bg-green').should('be.visible').click();
            cy.get('#password').should('have.id', 'password');
            cy.get('#password').should('be.visible');
            cy.get('.text-red-500').should('have.text', 'Este campo é obrigatório');
            cy.get('.text-red-500').should('be.visible');
        });
        
    })

    Cypress._.times(10, () => {

        it('Deve proibir fazer cadastro para um email já cadastrado', function () {
            cy.get('.md\\:hidden > button > img').should('be.visible');
            cy.get('.md\\:hidden').click();
            cy.get('.flex-col > .my-2 > .text-dark-purple').should('be.visible').click();
            cy.get('#name').type(`${faker.name.firstName()}`)
            cy.get('#lastName').type(`${faker.name.lastName()}`)
            cy.get('#email').type('maria@teste.com')
            cy.get('#repeatEmail').type( 'maria@teste.com')
            cy.get('#password').type(`${faker.internet.password(6, true)}`)
            cy.get('div.text-center > .bg-green').should('be.visible').click();
            cy.get('.Toastify__toast-body > :nth-child(2)').should('be.visible');
            cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', 'Infelizmente não foi possível registrar. Por favor, tente novamente mais tarde.');
        });

    })
  


});
