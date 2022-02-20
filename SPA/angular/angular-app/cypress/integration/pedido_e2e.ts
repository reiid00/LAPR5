import '../support/index';

describe('Profile', ()=>{
    before(()=>{
        cy.login('test@email.com', 'Imatestboy');
        });
    beforeEach(()=>{
        cy.visit('/#/pedido');
    });

    it('Criar Pedido Is Working',() =>{
        cy.contains('Pedidos App.');
        cy.get('[data-testid="buttonCriarPedido"]').click();
        cy.wait(1000);
        cy.get('[data-testid="new-descricaoUserInter"]').type('Introduzir Amigo test');
        cy.get('[data-testid="new-descricaoUserFinal"]').type('Adicionar Amigo test');
        cy.get('[data-testid="buttonEscolherUserInter"]').contains('Selecionar 1').click();
        cy.wait(1000);
        cy.get('[data-testid="buttonEscolherUserFinal"]').contains('Selecionar1').click();
        cy.wait(500);
        cy.get('[data-testid="buttonCriarPedidoF"]').click();
        cy.intercept('POST', 'api/Pedido');
    });
    it('Aprovar Pedido Is Working',() =>{
        cy.contains('Pedidos App.');
        cy.get('[data-testid="buttonAprovarPedido"]').click();
        cy.wait(200);
        cy.get('[data-testid="buttonAceitar"]').click();
        cy.intercept('PUT', 'api/Pedido/f81e5f6b-693c-4614-89d1-ebc88f05223e/userInter');
        cy.wait(200);
        cy.get('[data-testid="buttonRejeitar"]').click();
        cy.intercept('DELETE', 'api/Pedido/f81e5f6b-693c-4614-89d1-ebc88f05223e/hard');
    });
    it('Aceitar Pedido Is Working',() =>{
        cy.contains('Pedidos App.');
        cy.get('[data-testid="buttonAceitarPedido"]').click();
        cy.wait(200);
        cy.get('[data-testid="buttonAceitar"]').click();
        cy.intercept('PUT', 'api/Pedido/f81e5f6b-693c-4614-89d1-ebc88f05223e/userObjetivo');
        cy.wait(200);
        cy.get('[data-testid="buttonRejeitar"]').click();
        cy.intercept('DELETE', 'api/Pedido/f81e5f6b-693c-4614-89d1-ebc88f05223e/hard');
    });
});
