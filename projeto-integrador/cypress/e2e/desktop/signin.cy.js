const faker = require('faker')

// Como usuário anônimo
// Quero acessar anonimamente
// Para poder me registrar e acessar conteúdos extras

describe('Cadastro de usuario', () => {

   


    /*beforeEach(() => {
        cy.intercept('GET', '**!/registrationForm').as('getForm')
        cy.visit('/registrationForm')
        cy.wait('@getForm')
    })*/

    Cypress._.times(10, () => {

        const nome = faker.name.firstName()
        const sobreNome = faker.name.lastName()
        const email = faker.internet.email(nome, sobreNome)
        const senha = faker.internet.password(8, true, /[a-zA-Z0-9]/)

        it('Deve realizar o cadastro com sucesso! ', function () {
            cy.intercept('GET', '**/registrationForm').as('getForm')
            cy.visit('/registrationForm')
    
            cy.get('.p-1 > .w-full > .container > .hidden > :nth-child(1)')
            cy.get('#name').type(nome)
            cy.get('#lastName').type(sobreNome)
            cy.get('#email').type(email)
            cy.get('#repeatEmail').type(email)
            cy.get('#password').type(senha)
            cy.get('div.text-center > .bg-green').click()
    
            // Aqui será validado se o visitante foi cadastrado com sucesso
            cy.get('.Toastify__toast-body > :nth-child(2)').contains('Usuário cadastrado com sucesso')
                .should('exist', 'O toasty de sucesso deve ser exibido')
    
            cy.wait('@getForm')
        })
        
    })

    



})