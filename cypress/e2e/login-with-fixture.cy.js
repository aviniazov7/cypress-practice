describe('Login with Fixture', () => {

    beforeEach(() => {
        cy.visit('/login');
    });

    // טוען את הנתונים מ-users.json ושומר במשתנה
    it('should login with valid user from fixture', () => {
        cy.fixture('users').then((users) => {
            cy.login(users.valid.username, users.valid.password);

            cy.url().should('include', '/secure');
            cy.get('.flash.success').should('be.visible');
        });
    });

    it('should fail with invalid username from fixture', () => {
        cy.fixture('users').then((users) => {
            cy.login(users.invalidUsername.username, users.invalidUsername.password);

            cy.url().should('include', '/login');
            cy.get('.flash.error').should('be.visible');
        });
    });

    it('should fail with invalid password from fixture', () => {
        cy.fixture('users').then((users) => {
            cy.login(users.invalidPassword.username, users.invalidPassword.password);

            cy.url().should('include', '/login');
            cy.get('.flash.error').should('be.visible');
        });
    });
});
