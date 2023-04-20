/// <reference types="Cypress" />

describe('Essa suíte testa se a página "home" carrega corretamente', function () {

    beforeEach(function () {
        cy.visit('/')
        cy.viewport('iphone-5')
    })

    Cypress._.times(5, () => {
        it('Deve carregar a página corretamente',  () => {

            cy.get('.mr-4 > button > img').should('be.visible');
            cy.get('.text-gray-700 > .relative').should('be.visible');
            cy.get('.bg-green.py-2').should('be.visible');
    
        });

        it('Deve aparecer o menu "Sandwish" do lado direito da página', function () {

            cy.get('.md\\:hidden > button > img').should('be.visible');
            cy.get('.md\\:hidden > button > img').click();
            //cy.screenshot('click-on-menu')
    
        });
    })

    

});
