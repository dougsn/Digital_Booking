describe('Essa suite valida se a página Home carrega corretamente', () => {
    
    Cypress._.times(10, () => {

        it('Deve carregar a página corretamente', () => {
            cy.intercept('GET', '**/').as('getPage')
            cy.visit('/')
            cy.wait('@getPage')
            cy.contains('Buscar ofertas em hotéis, casas e muito mais')
    
        })
    })
})