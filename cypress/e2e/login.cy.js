describe('Login Page', () => {

  beforeEach(() => {
    cy.visit('/login');
  });

  it('should login successfully with valid credentials', () => {
    cy.get('#username').type('tomsmith');
    cy.get('#password').type('SuperSecretPassword!');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/secure');
    cy.get('.flash.success').should('contain', 'You logged into a secure area!');
  });

});
