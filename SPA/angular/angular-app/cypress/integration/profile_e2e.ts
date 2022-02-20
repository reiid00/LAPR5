
import '../support/index';

describe('Profile', ()=>{
    before(()=>{
        cy.login('test@email.com', 'Imatestboy');
        });
    beforeEach(()=>{
        cy.visit('/#/profile');
    });



    it('has the correct information',() =>{
        cy.get('[data-testid="email"]').should('have.text','test@email.com');
        cy.get('[data-testid="dataN"]').should('have.text','1999-01-22T00:00:00 ');
        cy.get('[data-testid="desc"]').should('have.text','Sou teste');
        cy.get('[data-testid="pais"]').should('have.text','Portugal ');
        cy.get('[data-testid="cidade"]').should('have.text',' Porto');
        cy.get('[data-testid="numTel"]').should('have.text','911555666');
        cy.get('[data-testid="eh"]').should('have.text','Estado Humor: Apaixonado');
        cy.get('[data-testid="tag"]').should('have.text',' inlove ');
    });

    it('displays correct email change', ()=>{

        cy.intercept('PUT', 'api/Utilizador/54aeeab2-3d9a-4476-a8ce-0a5d8db64fab', {
            body: {
                id:"54aeeab2-3d9a-4476-a8ce-0a5d8db64fab",
                nome:"User Teste",
                email:"changed@email.com",
                dataNascimento:"1999-01-22T00:00:00",
                password:"Imatestboy",
                avatar:"avatar",
                cidade:"Porto",
                pais:"Portugal",
                descricao:"Sou teste",
                numTelemovel:"911555666",
                estadoHumorId:"45431ce9-2330-47e0-949e-6cac7cf537f2",
                Tags:["inlove"]
            },
          });
        
          cy.get('[data-testid="button_email"').click();
          cy.get('[data-testid="new_email_box"]').should('be.visible');   
          cy.get('[data-testid="button_email_change"]').should('be.visible');

          cy.get('[data-testid="new_email_box"]').type('changed@email.com');
          cy.get('[data-testid="button_email_change"]').click();

          cy.get('[data-testid="email"]').should('have.text','changed@email.com');


    });

    it('displays correct data nascimento change', ()=>{

        cy.intercept('PUT', 'api/Utilizador/54aeeab2-3d9a-4476-a8ce-0a5d8db64fab', {
            body: {
                id:"54aeeab2-3d9a-4476-a8ce-0a5d8db64fab",
                nome:"User Teste",
                email:"test@email.com",
                dataNascimento:"1999-02-23T00:00:00",
                password:"Imatestboy",
                avatar:"avatar",
                cidade:"Porto",
                pais:"Portugal",
                descricao:"Sou teste",
                numTelemovel:"911555666",
                estadoHumorId:"45431ce9-2330-47e0-949e-6cac7cf537f2",
                Tags:["inlove"]
            },
          });
        
          cy.get('[data-testid="button_data"').click();
          cy.get('[data-testid="dataN_box"]').should('be.visible');   
          cy.get('[data-testid="button_dataN_change"]').should('be.visible');

          cy.get('[data-testid="dataN_box"]').type('1999-02-23');
          cy.get('[data-testid="button_dataN_change"]').click();

          cy.get('[data-testid="dataN"]').should('have.text','1999-02-23 ');


    });

    it('displays correct descricao change', ()=>{

        cy.intercept('PUT', 'api/Utilizador/54aeeab2-3d9a-4476-a8ce-0a5d8db64fab', {
            body: {
                id:"54aeeab2-3d9a-4476-a8ce-0a5d8db64fab",
                nome:"User Teste",
                email:"test@email.com",
                dataNascimento:"1999-01-22T00:00:00",
                password:"Imatestboy",
                avatar:"avatar",
                cidade:"Porto",
                pais:"Portugal",
                descricao:"Imchanged",
                numTelemovel:"911555666",
                estadoHumorId:"45431ce9-2330-47e0-949e-6cac7cf537f2",
                Tags:["inlove"]
            },
          });
        
          cy.get('[data-testid="button_desc"').click();
          cy.get('[data-testid="desc_box"]').should('be.visible');   
          cy.get('[data-testid="button_change_desc"]').should('be.visible');

          cy.get('[data-testid="desc_box"]').type('Imchanged');
          cy.get('[data-testid="button_change_desc"]').click();

          cy.get('[data-testid="desc"]').should('have.text','Imchanged');


    });

    it('displays correct pais change', ()=>{

        cy.intercept('PUT', 'api/Utilizador/54aeeab2-3d9a-4476-a8ce-0a5d8db64fab', {
            body: {
                id:"54aeeab2-3d9a-4476-a8ce-0a5d8db64fab",
                nome:"User Teste",
                email:"test@email.com",
                dataNascimento:"1999-01-22T00:00:00",
                password:"Imatestboy",
                avatar:"avatar",
                cidade:"Porto",
                pais:"Inglaterra",
                descricao:"Sou teste",
                numTelemovel:"911555666",
                estadoHumorId:"45431ce9-2330-47e0-949e-6cac7cf537f2",
                Tags:["inlove"]
            },
          });
        
          cy.get('[data-testid="button_pais"').click();
          cy.get('[data-testid="pais_box"]').should('be.visible');   
          cy.get('[data-testid="button_change_pais"]').should('be.visible');

          cy.get('[data-testid="pais_box"]').type('Inglaterra');
          cy.get('[data-testid="button_change_pais"]').click();

          cy.get('[data-testid="pais"]').should('have.text','Inglaterra ');


    });

    it('displays correct cidade change', ()=>{

        cy.intercept('PUT', 'api/Utilizador/54aeeab2-3d9a-4476-a8ce-0a5d8db64fab', {
            body: {
                id:"54aeeab2-3d9a-4476-a8ce-0a5d8db64fab",
                nome:"User Teste",
                email:"test@email.com",
                dataNascimento:"1999-01-22T00:00:00",
                password:"Imatestboy",
                avatar:"avatar",
                cidade:"Brighton",
                pais:"Portugal",
                descricao:"Sou teste",
                numTelemovel:"911555666",
                estadoHumorId:"45431ce9-2330-47e0-949e-6cac7cf537f2",
                Tags:["inlove"]
            },
          });
        
          cy.get('[data-testid="button_cidade"').click();
          cy.get('[data-testid="cidade_box"]').should('be.visible');   
          cy.get('[data-testid="button_change_cidade"]').should('be.visible');

          cy.get('[data-testid="cidade_box"]').type('Brighton');
          cy.get('[data-testid="button_change_cidade"]').click();

          cy.get('[data-testid="cidade"]').should('have.text',' Brighton');


    });

    it('displays correct num telemovel change', ()=>{

        cy.intercept('PUT', 'api/Utilizador/54aeeab2-3d9a-4476-a8ce-0a5d8db64fab', {
            body: {
                id:"54aeeab2-3d9a-4476-a8ce-0a5d8db64fab",
                nome:"User Teste",
                email:"test@email.com",
                dataNascimento:"1999-01-22T00:00:00",
                password:"Imatestboy",
                avatar:"avatar",
                cidade:"Porto",
                pais:"Portugal",
                descricao:"Sou teste",
                numTelemovel:"93988444",
                estadoHumorId:"45431ce9-2330-47e0-949e-6cac7cf537f2",
                Tags:["inlove"]
            },
          });
        
          cy.get('[data-testid="button_numTel"').click();
          cy.get('[data-testid="numTel_box"]').should('be.visible');   
          cy.get('[data-testid="button_change_numTel"]').should('be.visible');

          cy.get('[data-testid="numTel_box"]').type('93988444');
          cy.get('[data-testid="button_change_numTel"]').click();

          cy.get('[data-testid="numTel"]').should('have.text','93988444');


    });

    it('displays correct estado humor buttons', ()=>{

        cy.intercept('PUT', 'api/Utilizador/54aeeab2-3d9a-4476-a8ce-0a5d8db64fab', {
            body: {
                id:"54aeeab2-3d9a-4476-a8ce-0a5d8db64fab",
                nome:"User Teste",
                email:"test@email.com",
                dataNascimento:"1999-01-22T00:00:00",
                password:"Imatestboy",
                avatar:"avatar",
                cidade:"Porto",
                pais:"Portugal",
                descricao:"Sou teste",
                numTelemovel:"93988444",
                estadoHumorId:"45431ce9-2330-47e0-949e-6cac7cf537f2",
                Tags:["inlove"]
            },
          });
        
          cy.get('[data-testid="button_eh"').click();
          
          cy.get('[data-testid="eh_box"]').should('be.visible');   
          cy.get('[data-testid="button_change_eh"]').should('be.visible');

         

          


    });

    it('displays correct tag buttons', ()=>{

        cy.intercept('PUT', 'api/Utilizador/54aeeab2-3d9a-4476-a8ce-0a5d8db64fab', {
            body: {
                id:"54aeeab2-3d9a-4476-a8ce-0a5d8db64fab",
                nome:"User Teste",
                email:"test@email.com",
                dataNascimento:"1999-01-22T00:00:00",
                password:"Imatestboy",
                avatar:"avatar",
                cidade:"Porto",
                pais:"Portugal",
                descricao:"Sou teste",
                numTelemovel:"93988444",
                estadoHumorId:"45431ce9-2330-47e0-949e-6cac7cf537f2",
                Tags:["inlove"]
            },
          });
        
          cy.get('[data-testid="button_add1_tag"').click();
          
          cy.get('[data-testid="add_tag_box"]').should('be.visible');   
          cy.get('[data-testid="button_add2_tag"]').should('be.visible');

          cy.get('[data-testid="button_remove_tag"').click();
          
          cy.get('[data-testid="remove_tag_box"]').should('be.visible');   
          cy.get('[data-testid="button_remove2_tag"]').should('be.visible');

    });




});
/** Sample intercept -- change variables accordingly
 * cy.intercept('PUT', 'api/Utilizador*', {
            body: {
                id:"54aeeab2-3d9a-4476-a8ce-0a5d8db64fab",
                nome:"User Teste",
                email:"test@email.com",
                dataNascimento:"1999-01-22T00:00:00",
                password:"Imatestboy",
                avatar:"avatar",
                cidade:"Porto",
                pais:"Portugal",
                descricao:"Sou teste",
                numTelemovel:"911555666",
                estadoHumorId:"45431ce9-2330-47e0-949e-6cac7cf537f2",
                Tags:["inlove"]
            },
          });
 * 
 */