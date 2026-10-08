/// <reference types="cypress"/>
import { faker } from '@faker-js/faker';
import cadastroPage from '../support/pages/cadastro-page';

describe('Funcionalidade: Cadastro no Hub de Leitura', () => {

    beforeEach(() => {
        cadastroPage.visitarPaginaCadastro()
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('Deve fazer cadastro com sucesso, usando função JS', () => {
        const email = `teste${Date.now()}@teste.com`
        cy.get('#name').type('Thiago C. H. Moreira')
        cy.get('#email').type(email)
        cy.get('#phone').type('11987654321')
        cy.get('#password').type('Teste@123')
        cy.get('#confirm-password').type('Teste@123')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        cy.url().should('include', 'dashboard')
    });

    it('Deve fazer cadastro com sucesso, usando Faker', () => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email({ firstName, lastName }).toLowerCase();
        cy.get('#name').type(`${firstName} ${lastName}`)
        cy.get('#email').type(email)
        cy.get('#phone').type('11987654321')
        cy.get('#password').type('Teste@123')
        cy.get('#confirm-password').type('Teste@123')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        cy.url().should('include', 'dashboard')
        cy.get('#user-name').should('contain', `${firstName} ${lastName}`)
    });

    it('Deve preencher cadastro com sucesso - Usando comando customizado', () => {
        const email = `teste${Date.now()}@teste.com`
        const nome = faker.person.fullName({ sex: 'male' })
        cy.preencherCadastro(nome ,email, '1198765432165', 'Teste@123', 'Teste@123')
        cy.url().should('include', 'dashboard')
    }); 
    
    it('Deve fazer cadastro com sucesso - Usando Page Objects', () => {
        const email = `teste${Date.now()}@teste.com`
        cadastroPage.preencherCadastro('Thiago C. H. Moreira', email, '11987654321', 'Teste@123', 'Teste@123')
        cy.url().should('include', 'dashboard')
    });

    it('Deve validar mensagem ao tentar cadastrar sem preencher nome', () => {
        cadastroPage.preencherCadastro('', 'thiago@teste.com', '11987654321', 'Teste@123', 'Teste@123')
        cy.get(':nth-child(1) > .invalid-feedback').should('contain', 'Nome deve ter pelo menos 2 caracteres')
    });

});