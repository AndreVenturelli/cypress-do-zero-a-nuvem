describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  
  function itRepeated(description, times, testFn) {
    Cypress._.times(times, (i) => {
      it(`${description} (execução ${i + 1})`, testFn)
    })
  }

  itRepeated('verifica o título da aplicação', () => {
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  })

  
  it('preenche os campos obrigatorios e envia os formulários', () =>{
    cy.clock()

    const longText = Cypress._.repeat('adadasdasdasjndasjdnasjdnasdjnasdnjasdjasndjasn', 10)

    cy.get('#firstName').type('André')
    cy.get('#lastName').type('Venturelli')
    cy.get('#email').type('andreemail@gmail.com')
    cy.get('#open-text-area').type(longText, {delay: 0 })
    /*cy.get('#open-text-area').type('Estou apenas testando essa aplicação ',{delay: 0})*/
    cy.contains('button','Enviar').click()
    cy.get('.success').should('be.visible')

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')
  })

  Cypress._.times(3, () =>{
    it('preenche os campos obrigatorios e envia os formulários', () =>{
      cy.clock()
  
      const longText = Cypress._.repeat('adadasdasdasjndasjdnasjdnasdjnasdnjasdjasndjasn', 10)
  
      cy.get('#firstName').type('André')
      cy.get('#lastName').type('Venturelli')
      cy.get('#email').type('andreemail@gmail.com')
      cy.get('#open-text-area').type(longText, {delay: 0 })
      /*cy.get('#open-text-area').type('Estou apenas testando essa aplicação ',{delay: 0})*/
      cy.contains('button','Enviar').click()
      cy.get('.success').should('be.visible')
  
      cy.tick(3000)
  
      cy.get('.success').should('not.be.visible')
    })
  })

  itRepeated('exibe mensagem de erro ao submeter o formulário com um email com formatação invalida',3, () =>{
    cy.clock()
    cy.get('#firstName').type('André')
    cy.get('#lastName').type('Venturelli')
    cy.get('#email').type('andreemail@gmail;com')
    cy.get('#open-text-area').type('Estou apenas testando')
    cy.contains('button','Enviar').click()
    cy.get('.error').should('be.visible')

    cy.tick(3000)
    
    cy.get('.error').should('not.be.visible')
  })

  it('verifica se o campo telefone só aceita numeros', ()=>{
    cy.get('#phone')
    .type('testando@uhul')
    .should('have.value','')
  })

  it('exibe erro quando o telefone se torna obrigatorio mas n é preenchido antes do envio do forms', () =>{
    cy.get('#firstName').type('André')
    cy.get('#lastName').type('Venturelli')
    cy.get('#email').type('andreemail@gmail;com')
    cy.get('#open-text-area').type('Estou apenas testando')
    cy.get('#phone-checkbox').check()
cy.contains('button','Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () =>{
    cy.get('#firstName')
      .type('André')
      .should('have.value', 'André')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Venturelli')
      .should('have.value', 'Venturelli')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('andreventurelli10@gmail.com')
      .should('have.value', 'andreventurelli10@gmail.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('15998281077')
      .should('have.value', '15998281077')
      .clear()
      .should('have.value', '') 
  } )

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () =>{
    cy.clock()

    cy.contains('button','Enviar').click()
    cy.get('.error').should('be.visible')

    cy.tick(3000)

    cy.get('.error').should('not.be.visible')

  })
  it('envia forms de sucesso com comando customizado', () =>{
    cy.clock()
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')

    cy.tick(3000)

    cy.get('.error').should('not.be.visible')
  })

  it('seleciona um produto por seu texto', () =>{
    cy.get('#product')
    .select('YouTube')
    .should('have.value', 'youtube')

  })

  it('seleciona um produto (mentoria) pelo seu valor(value)', () =>{
    cy.get('#product')
    .select('mentoria')
    .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () =>{
    cy.get('#product')
    .select(1)
    .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () =>{
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  it('marca cada tipo de atendimento', ()=>{
    cy.get('input[type="radio"]')
      .each(typeOfService =>{
        cy.wrap(typeOfService)
        .check()
        .should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', ()=>{
    cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', ()=>{
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => (
        expect(input[0].files[0].name).to.equal('example.json')
      ))
  })

  it('seleciona um arquivo simulando um drag-and-drop', ()=>{
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
      .should(input =>{
        expect(input[0].files[0].name).to.equal('example.json')
      })

  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', ()=>{
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile')  
      .should(input => (
        expect(input[0].files[0].name).to.equal('example.json')
      ))
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', ()=>{
    cy.contains('a', 'Política de Privacidade')
     .should('have.attr', 'href', 'privacy.html')
     .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', ()=> {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr','target')
      .click()

      cy.contains('h1', 'CAC TAT - Política de Privacidade')
        .should('be.visible')
  })

  it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })
  
  it('preenche o campo da área de texto usando o comando invoke',() => {
    cy.get('#open-text-area').invoke('val', 'um texto qualquer')
      .should('have.value', 'um texto qualquer')
  })

  it('faz uma requisição HTTP',() =>{
    cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
      .as('getRequest')
      .its('status')
      .should('be.equal', 200)
    cy.get('@getRequest')
      .its('statusText')
      .should('be.equal', 'OK')
    cy.get('@getRequest')
      .its('body')
      .should('include', 'CAC TAT')

  })

})
