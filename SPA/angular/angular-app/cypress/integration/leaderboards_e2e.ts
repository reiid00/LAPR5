import '../support/index';

describe('Forca-ligacao', ()=>{
    it('Verify leadeaboard Fortaleza Rede', () => {
        cy.visit('localhost:4200/#/home');
        cy.get('[data-testid="leaderboard"]').click()
        cy.get('[data-testid="fortaleza-rede"]').click()

    });
    it('Verify leadeaboard Dimensao Rede', () => {
        cy.visit('localhost:4200/#/home');
        cy.get('[data-testid="leaderboard"]').click()
        cy.get('[data-testid="dimensao-rede"]').click()

    });
});