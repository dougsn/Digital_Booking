describe('Login, teste da API', () => {

  it('Deve fazer login com sucesso', () => {

    cy.request({
      method: 'POST',
      url: 'authentication/login',
      body: {
        'email': 'maria@teste.com',
        'password': '123456'
      }

    }).then((response) => {
      expect(response.status).to.equal(200)
      cy.log(response.body.token)
      cy.log('Login realizado com sucesso!')
    })

  })

  it('Deve negar acesso com o email errado', function () {
    cy.request({
      method: 'POST',
      url: 'authentication/login',
      failOnStatusCode: false,
      body: {
        'email': 'leao@errado.com',
        'password': '12345678'
      }
    }).then((response) => {
      expect(response.status).to.equal(403)
      cy.log('Acesso negado!')
    })
  })

  it('Deve negar acesso com a senha errada', function () {
    cy.request({
      method: 'POST',
      url: 'authentication/login',
      failOnStatusCode: false,
      body: {
        'email': 'leao@leao.com',
        'password': '1234567'
      }
    }).then((response) => {
      expect(response.status).to.equal(403)
      cy.log('Acesso negado!')
    })
  })

})
