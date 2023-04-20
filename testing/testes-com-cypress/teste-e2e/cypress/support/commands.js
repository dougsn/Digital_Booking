Cypress.Commands.add('fillSignupFormAndSubmit', (email, password) => {
  cy.visit('/signup')
  cy.get('#email').type(email)
  cy.get('#password').type(password, { log: false })
  cy.get('#confirmPassword').type(password, { log: false })
  cy.contains('button', 'Signup').click()
  cy.get('#confirmationCode').should('be.visible')
})

Cypress.Commands.add('cadastrarProduto', () => {
  cy.request({
    method: 'POST',
    url: 'produto/adicionar',
    /* eslint-disable */
    body: {
      "nome": "Teste",
      "descricao": "Teste",
      "imagens": [
        {
          "id": 2
        }
      ],
      "categoria": {
        "id": 1
      },
      "cidade": {
        "id": 2
      },
      "caracteristicas": [
        {
          "id": 4
        }
      ]
    },
    
    // failOnStatusCode: false,
    /* eslint-enable */
  })
})