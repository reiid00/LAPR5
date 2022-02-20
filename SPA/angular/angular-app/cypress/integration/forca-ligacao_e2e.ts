import '../support/index';

describe('Forca-ligacao', ()=>{
    it('Executes All Components', () => {
        cy.visit('localhost:4200/#/home');
        cy.get('[data-testid="forca-ligacao"]').click()
    
    cy.contains('Home')
    cy.contains('Sign Up')
    cy.contains('Login')
    cy.contains('Consultar força de ligação entre dois utilizadores')
    cy.contains('Escolher Utilizador')
    cy.contains('Utilizador')
        
     
    })

    it('Check Forca-Ligacao', () => {
        cy.visit('localhost:4200/#/forca-ligacao');
        cy.get('input').type('Summer')
        cy.get('[data-testid="buttonEscolherUser"]').click()
        cy.contains('Escolher Amigo')
        cy.contains('Pearline')
        cy.get('[data-testid="buttonEscolherAmigo"]').contains('Escolher 0').click()   
    })
  
});
