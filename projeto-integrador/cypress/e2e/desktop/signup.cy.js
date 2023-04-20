

describe('Esta suite testa o fluxo de Login', () => {
    const password = Cypress.env('PASSWORD')

    it('successfully logs in', () => {
        cy.intercept('GET', '**/login').as('getNotes')

        cy.visit('/login')
        cy.get('#email').type(Cypress.env('EMAIL'))
        cy.get('#password').type(password, {log: false})
        cy.contains('button', 'Entrar').click()

        cy.wait('@getNotes')
        cy.contains('Maria').should('be.visible')

    })

})