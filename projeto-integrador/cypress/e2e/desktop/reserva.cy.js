/// <reference types="Cypress" />

describe('Esta suite testa o fluxo de reserva de hotel', () => {
    const password = Cypress.env('PASSWORD')

    it('Deve reservar o hotel com sucesso ',  () => {
        cy.intercept('GET', '**/login').as('getNotes')
        cy.visit('/login')
        cy.viewport(1920, 1080)
        cy.get('#email').type(Cypress.env('EMAIL'))
        cy.get('#password').type(password, {log: false})
        cy.contains('button', 'Entrar').click()
        cy.wait('@getNotes')
        cy.get('#HOSTEL > :nth-child(1) > .greyscale-0 > .transition-all').should('be.visible')
        cy.get('#HOSTEL > :nth-child(1) > .greyscale-0 > .transition-all').click();
        cy.contains('Ver mais ').eq(0).should('be.visible')
        cy.contains('Ver mais ').eq(0).click()
        cy.contains('Iniciar reserva').click();
        cy.get('#city').clear('O');
        cy.get('#city').type('Olinda');
        cy.get('.hidden > .react-calendar > .react-calendar__viewContainer > :nth-child(2) > [style="display: flex; align-items: flex-end;"] > [style="flex-grow: 1; width: 100%;"] > .react-calendar__month-view__days > :nth-child(23) > abbr').click();
        cy.get('.hidden > .react-calendar > .react-calendar__viewContainer > :nth-child(2) > [style="display: flex; align-items: flex-end;"] > [style="flex-grow: 1; width: 100%;"] > .react-calendar__month-view__days > :nth-child(23) > abbr').click();
        cy.get('.css-13cymwt-control').click();
        cy.contains('06:00').click();
        cy.get('.justify-center > .text-white').click();
        cy.screenshot() //Evidência para a Sprint 4
    })

    it('Deve proibir reservar o hotel com a mesma data', () => {
        cy.intercept('GET', '**/login').as('getNotes')
        cy.visit('/login')
        cy.viewport(1920, 1080)
        cy.get('#email').type(Cypress.env('EMAIL'))
        cy.get('#password').type(password, {log: false})
        cy.contains('button', 'Entrar').click()
        cy.wait('@getNotes')
        cy.wait(5000)
        cy.get('#HOSTEL > :nth-child(1) > .greyscale-0 > .transition-all').should('be.visible')
        cy.get('#HOSTEL > :nth-child(1) > .greyscale-0 > .transition-all').click();
        cy.contains('Ver mais ').eq(0).should('be.visible')
        cy.contains('Ver mais ').eq(0).click()
        cy.contains('Iniciar reserva').click();
        cy.get('#city').clear('O');
        cy.get('#city').type('Olinda');
        cy.get('.hidden > .react-calendar > .react-calendar__viewContainer > :nth-child(2) > [style="display: flex; align-items: flex-end;"] > [style="flex-grow: 1; width: 100%;"] > .react-calendar__month-view__days > :nth-child(23)').click();
        cy.get('.react-calendar__tile--hoverEnd > abbr').click();
        cy.get('.css-13cymwt-control').click();
        cy.contains('06:00').click();
        cy.get('.justify-center > .text-white').click();
        cy.get('.grid > .Toastify > .Toastify__toast-container >').should('be.visible')
    })

        it.skip('Deve cancelar uma reserva',  () => {
        cy.intercept('GET', '**/login').as('getNotes')
        cy.visit('/login')
        cy.viewport(1920, 1080)
        cy.get('#email').type(Cypress.env('EMAIL'))
        cy.get('#password').type(password, {log: false})
        cy.contains('button', 'Entrar').click()
        cy.wait('@getNotes')
        cy.wait(5000)
        cy.get(':nth-child(2) > .text-sm').should('be.visible')
        cy.get(':nth-child(2) > .text-sm').click();
        cy.contains('Cancelar Reserva').eq('0').click()
        cy.get('.fixed > .text-md').should('have.text', 'Deseja realmente cancelar esta reserva?');
        cy.get('.fixed > .flex > :nth-child(1)').should('be.enabled');
        cy.get('.fixed > .flex > :nth-child(2)').should('be.enabled');
        cy.get('.fixed > .flex > :nth-child(1)').click();
        //cy.get('.Toastify__toast-body').should('contains', ' ')



    });

})
