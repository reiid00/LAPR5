describe('SPA Main Page', () => {
  it('Executes All Components', () => {
    cy.visit('https://vs-gate.dei.isep.ipp.pt:10820/#/home')      //Goes into the SPA main page
    
    cy.contains('Home')
    cy.contains('Força de Ligação')
    cy.contains('Leaderboard')
    cy.contains('Tag Cloud de Todos os Utilizadores')
    cy.contains('MyApp')
    cy.contains('Sign Up')
    cy.contains('Login').click()
            it('Types in email value'), () => {
                cy.get('#email:').type('nuzumaki@email.com').should('nuzumaki@email.com')
            }
            it('Types in email value'), () => {
                cy.get('#password:').type('NUzumaki123').should('NUzumaki123')
            }    
    
    cy.contains('Número de utilizadores da rede:')

  })
})
