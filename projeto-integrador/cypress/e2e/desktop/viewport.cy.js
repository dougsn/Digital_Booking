describe('Responsividade', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('O site deve ser responsível para Desktop, Mobile e Tablet', () => {

        cy.get('.pt-24 > .container').should('be.visible')
        cy.viewport(320, 480)

        // the navbar should have collapse since our screen is smaller
        cy.get('.p-1 > .w-full > .container > .hidden > :nth-child(2)').should('not.be.visible')
        cy.get('.pt-24 > .container').should('be.visible')
        // cy.get('.nav').find('a').should('be.visible')

        // lets see what our app looks like on a super large screen
        cy.viewport(2999, 2999)


        // cy.viewport() accepts a set of preset sizes
        // to easily set the screen to a device's width and height

        // We added a cy.wait() between each viewport change so you can see
        // the change otherwise it is a little too fast to see :)

        cy.viewport('macbook-15')
        cy.screenshot()
        cy.wait(200)
        cy.viewport('macbook-13')
        cy.wait(200)
        cy.viewport('macbook-11')
        cy.wait(200)
        cy.viewport('ipad-2')
        cy.wait(200)
        cy.viewport('ipad-mini')
        cy.screenshot()
        cy.wait(200)
        cy.viewport('iphone-6+')
        cy.wait(200)
        cy.viewport('iphone-6')
        cy.wait(200)
        cy.viewport('iphone-5')
        cy.screenshot()
        cy.wait(200)
        cy.viewport('iphone-4')
        cy.wait(200)
        cy.viewport('iphone-3')
        cy.wait(200)

        // cy.viewport() accepts an orientation for all presets
        // the default orientation is 'portrait'
        cy.viewport('ipad-2', 'portrait')
        cy.wait(200)
        cy.viewport('iphone-4', 'landscape')
        cy.wait(200)

        // The viewport will be reset back to the default dimensions
        // in between tests (the  default can be set in cypress.config.js)

    })

})