import { faker } from '@faker-js/faker'

describe('Signin, teste da API', () => {

  it('Deve fazer o cadastro com sucesso', () => {
    const nameFaker = faker.name.firstName()
    const lastnameFaker = faker.name.lastName()
    const emailFaker = faker.internet.email()
    const passwordFaker = faker.internet.password(8)

    cy.request({
      method: 'POST',
      url: 'authentication/register',
      body: {
        'firstname': nameFaker,
        'lastname': lastnameFaker,
        'email': emailFaker,
        'password': passwordFaker
      }

    }).then((response) => {
      expect(response.status).to.equal(201)
      expect(response).to.have.property('headers')
      cy.log(response.body.token)
      cy.log('Usuário cadastrado com sucesso!')
    })

  })

})