/// <reference types="Cypress" />

describe('Esta suíte testa o fluxo de login', function () {

    beforeEach(function () {
        cy.visit('/')
        cy.viewport('iphone-5')
    })

    it('Deve fazer login com sucesso!', function () {
        cy.get('.md\\:hidden > button > img').should('be.visible');
        cy.get('.md\\:hidden > button > img').click();
        cy.get('.flex-col > :nth-child(3) > .text-dark-purple').click();
        cy.get('form > .text-green').should('have.text', 'Iniciar sessão');
        cy.get('#email').click();
        cy.get('#email').should('be.visible');
        cy.get('#password').should('be.visible');
        cy.get('div.text-center > .bg-green').should('be.visible');
        cy.get('div.text-center > .bg-green').should('be.enabled');
        cy.get('#email').clear('ma');
        cy.get('#email').type('maria@teste.com');
        cy.get('#password').clear();
        cy.get('#password').type('123456');
        cy.get('div.text-center').click();
        cy.get('.md\\:hidden > button > img').should('be.visible');
        cy.get('.md\\:hidden > button > img').click();
        cy.get('.text-end > .flex-col > :nth-child(3) > .text-dark-purple').should('be.visible')
        cy.get('.text-end > .flex-col > :nth-child(3) > .text-dark-purple').should('have.a.text', 'Maria Teste');
        cy.screenshot('signinScreenshot')
    });

    it('Deve proibir fazer login com email inválido', function () {

        cy.get('.md\\:hidden > button > img').should('be.visible');
        cy.get('.md\\:hidden > button > img').click();
        cy.get('.flex-col > :nth-child(3) > .text-dark-purple').click();
        cy.get('#email').should('be.visible');
        cy.get('#password').should('be.visible');
        cy.get('div.text-center > .bg-green').should('be.visible');
        cy.get('#email').clear('m');
        cy.get('#email').type('maria.com');
        cy.get('#password').clear();
        cy.get('#password').type('123456');
        cy.get('div.text-center > .bg-green').click();
        cy.screenshot('erroEmail')

    });

    it('Deve proibir fazer login com a senha errada', function () {
        cy.get('.md\\:hidden > button > img').should('be.visible');
        cy.get('.md\\:hidden > button > img').click();
        cy.get('.flex-col > :nth-child(3) > .text-dark-purple').click();
        cy.get('#email').should('be.visible');
        cy.get('#password').should('be.visible');
        cy.get('div.text-center > .bg-green').should('be.visible');
        cy.get('#email').clear('m');
        cy.get('#email').type('maria@teste.com');
        cy.get('#password').clear();
        cy.get('#password').type('12345');
        cy.get('div.text-center > .bg-green').click();
        cy.get('.text-red-500').should('be.visible');
        cy.get('.text-red-500').should('have.text', 'A senha possui 6 ou mais caracteres.');
        cy.screenshot('erroPassword')

    });

    it('Deve proibir fazer login com email e senha inválidos', function () {
        cy.get('.md\\:hidden > button > img').should('be.visible');
        cy.get('.md\\:hidden > button > img').click();
        cy.get('.flex-col > :nth-child(3) > .text-dark-purple').click();
        cy.get('#email').should('be.visible');
        cy.get('#password').should('be.visible');
        cy.get('div.text-center > .bg-green').should('be.visible');
        cy.get('#email').clear('m');
        cy.get('#email').type('mariateste.com');
        cy.get('#password').clear();
        cy.get('#password').type('123');
        cy.get('div.text-center > .bg-green').click();
        cy.screenshot('loginSenhaInvalidos')

    });

});