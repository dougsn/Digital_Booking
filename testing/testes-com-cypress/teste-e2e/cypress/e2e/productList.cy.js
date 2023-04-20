// import { faker } from '@faker-js/faker'
let productId


describe('Produtos, teste da API', () => {

  it('Deve listar todos os produtos cadastrados com sucesso!', () => {
    cy.request({
      method: 'GET',
      url: 'produto',
    }).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body).to.exist
      expect(response.body).to.have.property(0)
    })
  })

  it.skip('Deve listar um produto específico pela id', () => {
    cy.request({
      method: 'GET',
      url: 'produto/4'
    }).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body).to.have.property('id')
    })
  })

  it('Deve listar os produtos pela cidade', () => {
    cy.request({
      method: 'GET',
      url: 'produto/cidade?nomeCidade=sao%20paulo'
    }).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body[0].cidade.nome).to.equal('São Paulo')
    })

  })

  it('Deve listar os produtos pela categoria', () => {
    cy.request({
      method: 'GET',
      url: 'produto/categoria?qualificacao=APARTAMENTO'
    }).then((response) => {
      expect(response.status).to.equal(200)
    })

  })

  it.skip('Deve cadastrar um produto com sucesso!', () => {


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
    }).then((response) => {
      productId = response.body.id
      expect(response.status).to.be.within(200, 299)
      // Armazena o ID do produto no localStorage
      window.localStorage.setItem('productId', productId)
    })
  })


  it.skip('Deve deletar um produto previamente cadastrado', () => {
    cy.cadastrarProduto()
      .then((response) => {
        let id = response.body.id
        cy.request({
          method: 'DELETE',
          url: `produto/delete/${id}`,
          failOnStatusCode: false,

        })
      })
  })

})
