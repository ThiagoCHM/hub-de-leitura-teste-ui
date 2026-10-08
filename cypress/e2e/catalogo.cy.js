/// <reference types="cypress"/>

describe('Funcionalidade: Catálogo de livros', () => {

    beforeEach(() => {
        cy.visit('catalog.html')
    });

    it.skip('Deve clicar no botão Adicionar à cesta', () => {
        cy.get(':nth-child(1) > .card > .card-body > .mt-auto > .d-grid > .btn-primary').click()
        cy.get('#cart-count').should('contain', 1)
    });

    it('Deve clicar em todos os botões Adicionar à cesta', () => {
        cy.get('.btn-primary').click({ multiple: true })
    });

    it('Deve clicar no primeiro botão Adicionar à cesta', () => {
        cy.get('.btn-primary').first().click()
    });

    it('Deve clicar no último botão Adicionar à cesta', () => {
        cy.get('.btn-primary').last().click()
    });

    it('Deve clicar no terceiro botão Adicionar à cesta', () => {
        cy.get('.btn-primary').eq(2).click()
    });

    it('Deve clicar no quinto botão Adicionar à cesta', () => {
        cy.get('.btn-primary').eq(4).click()
        cy.get('#global-alert-container').should('contain', 'A Metamorfose')
    });

    it('Deve clicar no nome do livro e direcionar para a tela do livro', () => {
        cy.contains('Dom Casmurro').click()
        cy.url().should('include', 'book-details')
        cy.get('#add-to-cart-btn').click()
        cy.get('#alert-container').should('contain', 'Livro adicionado à cesta com sucesso!')
    });

    it('Deve clicar em um botão Adicionar à cesta de forma Randômica', () => {
        cy.get('.btn-primary').its('length').then((totalDeBotoes) => {
            // Gera um Índice Aleatório
            const indiceAleatorio = Math.floor(Math.random() * totalDeBotoes);
            // Clica no Botão correspondente ao Índice Sorteado
            cy.get('.btn-primary').eq(indiceAleatorio).click();
        });
    });

    ity('Deve clicar em dois botões Adicionar à cesta de forma Randômica', () => {
        cy.get('.btn-primary').its('length').then((totalDeBotoes) => {
            // Garante que existem pelo menos 2 botões na tela para o teste fazer sentido
            expect(totalDeBotoes).to.be.greaterThan(1);
            // 1. Sorteia e clica no primeiro botão
            const primeiroIndice = Math.floor(Math.random() * totalDeBotoes);
            cy.log(`Primeiro botão selecionado: índice ${primeiroIndice}`);
            cy.get('.btn-primary').eq(primeiroIndice).click();
            // 2. Sorteia o segundo índice e garante que ele seja DIFERENTE do primeiro
            let segundoIndice = Math.floor(Math.random() * totalDeBotoes);
            while (segundoIndice === primeiroIndice) {
                segundoIndice = Math.floor(Math.random() * totalDeBotoes);
            }
            // 3. Clica no segundo botão
            cy.log(`Segundo botão selecionado: índice ${segundoIndice}`);
            cy.get('.btn-primary').eq(segundoIndice).click();
        });
    });

});