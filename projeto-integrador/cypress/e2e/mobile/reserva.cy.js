/// <reference types="Cypress" />

describe('Esta suíte testa o fluxo de reserva', function () {

    beforeEach(function () {
        cy.visit('/')
        cy.viewport('iphone-5')
    })

    it('Deve fazer a reserva com sucesso', function () {
        cy.get('.md\\:hidden > button > img').should('be.visible');
        cy.get('.md\\:hidden > button > img').click();
        cy.get('.flex-col > :nth-child(3) > .text-dark-purple').click();
        cy.get('form > .text-green').should('have.text', 'Iniciar sessão');
        cy.get('#email').click();
        cy.get('#email').should('be.visible');
        cy.get('#password').should('be.visible');
        cy.get('div.text-center > .bg-green').should('be.visible');
        cy.get('div.text-center > .bg-green').should('be.enabled');
        cy.get('#email').clear('ma');
        cy.get('#email').type('maria@teste.com');
        cy.get('#password').clear();
        cy.get('#password').type('123456');
        cy.get('div.text-center > .bg-green').should('be.visible');
        cy.get('div.text-center > .bg-green').click();
        cy.get('#HOTEL > :nth-child(1) > .greyscale-0 > .transition-all').click();
        cy.contains('Ver mais ').eq(0).should('be.visible')
        cy.contains('Ver mais ').eq(0).click()
        cy.get('.block > .flex > :nth-child(2) > .w-80 > .text-white').click();
        cy.get('#city').clear('o');
        cy.get('#city').type('olinda');
        cy.get('.block > .react-calendar > .react-calendar__viewContainer > .react-calendar__month-view > [style="display: flex; align-items: flex-end;"] > [style="flex-grow: 1; width: 100%;"] > .react-calendar__month-view__days > :nth-child(38)').click();
        cy.get('.block > .react-calendar > .react-calendar__viewContainer > .react-calendar__month-view > [style="display: flex; align-items: flex-end;"] > [style="flex-grow: 1; width: 100%;"] > .react-calendar__month-view__days > :nth-child(5)').click();
        cy.get('.css-13cymwt-control').click();
        cy.contains('06:00').click();
        cy.get('.justify-center > .text-white').should('be.visible');
        cy.get('.justify-center > .text-white').click();
        // cy.get('.bg-white > .text-green').should('have.text', 'Muito obrigado!');
        // cy.get('.bg-white > .text-dark-purple').should('have.text', 'Sua reserva foi feita com sucesso');
        // cy.get('.pt-7 > .text-white').should('be.visible');
        cy.screenshot('reservaSucesso')
    });

    it('Deve proibir fazer reserva com dados incompleto', function () {
        cy.get('.md\\:hidden > button > img').should('be.visible');
        cy.get('.md\\:hidden > button > img').click();
        cy.get('.flex-col > :nth-child(3) > .text-dark-purple').click();
        cy.get('form > .text-green').should('have.text', 'Iniciar sessão');
        cy.get('#email').click();
        cy.get('#email').should('be.visible');
        cy.get('#password').should('be.visible');
        cy.get('div.text-center > .bg-green').should('be.visible');
        cy.get('div.text-center > .bg-green').should('be.enabled');
        cy.get('#email').clear('ma');
        cy.get('#email').type('maria@teste.com');
        cy.get('#password').clear();
        cy.get('#password').type('123456');
        cy.get('div.text-center > .bg-green').should('be.visible');
        cy.get('div.text-center > .bg-green').click();
        cy.get('#HOTEL > :nth-child(1) > .greyscale-0 > .transition-all').click();
        cy.contains('Ver mais ').eq(0).should('be.visible')
        cy.contains('Ver mais ').eq(0).click()
        cy.get('.block > .flex > :nth-child(2) > .w-80 > .text-white').click();
        cy.get('.justify-center > .text-white').should('have.text', 'Confirmar reserva');
        cy.get('.justify-center > .text-white').should('be.visible');
        cy.get('.justify-center > .text-white').click();
        cy.get('.grid > .Toastify > .Toastify__toast-container > #\\32  > .Toastify__toast-body > :nth-child(2)').should('be.visible');
       
    });

    it('Deve proibir fazer reserva em dias indisponíveis', function () {
        cy.get('.md\\:hidden > button > img').should('be.visible');
        cy.get('.md\\:hidden > button > img').click();
        cy.get('.flex-col > :nth-child(3) > .text-dark-purple').click();
        cy.get('form > .text-green').should('have.text', 'Iniciar sessão');
        cy.get('#email').click();
        cy.get('#email').should('be.visible');
        cy.get('#password').should('be.visible');
        cy.get('div.text-center > .bg-green').should('be.visible');
        cy.get('div.text-center > .bg-green').should('be.enabled');
        cy.get('#email').clear('ma');
        cy.get('#email').type('maria@teste.com');
        cy.get('#password').clear();
        cy.get('#password').type('123456');
        cy.get('div.text-center > .bg-green').should('be.visible');
        cy.get('div.text-center > .bg-green').click();
        cy.get('#HOTEL > :nth-child(1) > .greyscale-0 > .transition-all').should('be.visible');
        cy.get('#HOTEL > :nth-child(1) > .greyscale-0 > .transition-all').click();
        cy.contains('Ver mais ').eq(0).should('be.visible')
        cy.contains('Ver mais ').eq(0).click()
        cy.get('.block > .flex > :nth-child(2) > .w-80 > .text-white').click();
        cy.get('#city').clear('o');
        cy.get('#city').type('olinda');
        cy.get('.block > .react-calendar > .react-calendar__viewContainer > .react-calendar__month-view > [style="display: flex; align-items: flex-end;"] > [style="flex-grow: 1; width: 100%;"] > .react-calendar__month-view__days > :nth-child(38) > abbr').click();
        cy.get('.block > .react-calendar > .react-calendar__viewContainer > .react-calendar__month-view > [style="display: flex; align-items: flex-end;"] > [style="flex-grow: 1; width: 100%;"] > .react-calendar__month-view__days > :nth-child(5)').click();
        cy.get('.grid > .Toastify > .Toastify__toast-container > #\\32  > .Toastify__toast-body > :nth-child(2)').should('have.text', 'A data 04/05/2023 já posssui reserva. Por favor, selecione outra data.');
        cy.get('.css-13cymwt-control').click();
        cy.contains('06:00').click();
        cy.get('.justify-center > .text-white').click();
        cy.get('.grid > .Toastify > .Toastify__toast-container > #\\33  > .Toastify__toast-body > :nth-child(2)').should('have.text', 'Desculpe, não foi possível realizar a reserva.');
        cy.get('.grid > .Toastify > .Toastify__toast-container > #\\33  > .Toastify__toast-body > :nth-child(2)').should('be.visible');
    });

    it.skip('Deve cancelar uma reserva previamente cadastrada', function () {
        cy.get('.md\\:hidden > button > img').should('be.visible');
        cy.get('.md\\:hidden > button > img').click();
        cy.get('.flex-col > :nth-child(3) > .text-dark-purple').click();
        cy.get('form > .text-green').should('have.text', 'Iniciar sessão');
        cy.get('#email').click();
        cy.get('#email').should('be.visible');
        cy.get('#password').should('be.visible');
        cy.get('div.text-center > .bg-green').should('be.visible');
        cy.get('div.text-center > .bg-green').should('be.enabled');
        cy.get('#email').clear('ma');
        cy.get('#email').type('maria@teste.com');
        cy.get('#password').clear();
        cy.get('#password').type('123456');
        cy.get('div.text-center > .bg-green').should('be.visible');
        cy.get('div.text-center > .bg-green').click();
        cy.get('.md\\:hidden > button > img').should('be.visible');
        cy.get('.md\\:hidden > button > img').click();
        cy.get('.flex-1 > :nth-child(1) > :nth-child(3) > .text-dark-purple').click();
        cy.get('._btn_1cb9h_1').eq(0).should('be.visible')
        cy.contains('Cancelar Reserva').eq(0).click()
        cy.get('.fixed > .text-md').should('have.text', 'Deseja realmente cancelar esta reserva?');
        cy.get('.fixed > .flex > :nth-child(1)').should('be.visible');
        cy.get('.fixed > .flex > :nth-child(2)').should('be.visible');
        cy.get('.fixed > .flex > :nth-child(1)').should('be.enabled');
        cy.get('.fixed > .flex > :nth-child(2)').should('be.enabled');
        cy.get('.fixed > .flex > :nth-child(1)').click();

    });

});
