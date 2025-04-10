Cypress._.times(3, ()=>{
    It('testa a pagina de politica de privacidade de forma independente',() =>{
        cy.visit('./src/privacy.html')

        cy.contains('h1','CAC TAT - Política de Privacidade')
        cy.contains('p', 'Talking About Testing').should('be.visible')
    })
})