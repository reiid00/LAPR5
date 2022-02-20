import '../support/index';


    it('CONSULA TAG TAG CLOUD TODOS USERS', () => {
        cy.visit('/#/home');
        cy.get('[data-testid="tags"]').click();
        cy.wait(1000);
        cy.get('[data-testid="tagCloud"]').click()
        cy.wait(1000);
        cy.get('[data-testid="tag-cloud"]').click()
    });

    it('CONSULA TAG TAG CLOUD TODAS RELACOES', () => {
        cy.visit('/#/home');
        cy.get('[data-testid="tags"]').click();
        cy.wait(1000);
        cy.get('[data-testid="tag-all-relacoes"]').click()
        cy.wait(1000);
        cy.get('[data-testid="tag-cloud"]').click()
    });

    it('CONSULA TAG TAG CLOUD RELACOES PROPRIO UTILIZADOR', () => {
        cy.login('test@email.com', 'Imatestboy');
        cy.visit('/#/home');
        cy.get('[data-testid="tags"]').click();
        cy.wait(1000);
        cy.get('[data-testid="tag-cloud-relacoes-proprio"]').click()
        cy.wait(1000);
        cy.get('[data-testid="tag-cloud"]').click()
    });

    it('CONSULA TAG TAG CLOUD DO PROPRIO UTILIZADOR', () => {
        cy.visit('/#/home');
        cy.get('[data-testid="tags"]').click();
        cy.wait(1000);
        cy.get('[data-testid="tag-cloud-proprio"]').click()
        cy.wait(1000);
        cy.get('[data-testid="tag-cloud"]').click()
    });



