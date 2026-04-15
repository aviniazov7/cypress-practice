describe('Login Page', () => {

  beforeEach(() => {
    cy.visit('/login');
  });

  // בודק שהדף נטען עם כל האלמנטים
  it('should display the login form correctly', () => {
    cy.get('h2').should('be.visible').and('contain', 'Login Page');
    cy.get('#username').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible').and('contain', 'Login');
  });

  // התחברות מוצלחת — משתמש ב-cy.login() במקום 3 שורות
  it('should login successfully with valid credentials', () => {
    cy.login('tomsmith', 'SuperSecretPassword!');

    cy.url().should('include', '/secure');
    cy.get('.flash.success').should('be.visible')
      .and('contain', 'You logged into a secure area!');
    cy.get('a[href="/logout"]').should('be.visible');
  }); 

  // שם משתמש שגוי
  it('should show error for invalid username', () => {
    cy.login('wronguser', 'SuperSecretPassword!');

    cy.url().should('include', '/login');
    cy.get('.flash.error').should('be.visible')
      .and('contain', 'Your username is invalid!');
  });

  // סיסמה שגויה
  it('should show error for invalid password', () => {
    cy.login('tomsmith', 'wrongpassword');

    cy.url().should('include', '/login');
    cy.get('.flash.error').should('be.visible')
      .and('contain', 'Your password is invalid!');
  });

  // שליחת טופס ריק
  it('should show error when submitting empty fields', () => {
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/login');
    cy.get('.flash.error').should('be.visible');
  });

  // זרימה מלאה: login ואז logout
  it('should logout successfully after login', () => {
    cy.login('tomsmith', 'SuperSecretPassword!');
    cy.url().should('include', '/secure');

    cy.get('a[href="/logout"]').click();

    cy.url().should('include', '/login');
    cy.get('.flash.success').should('be.visible')
      .and('contain', 'You logged out of the secure area!');
  });

});
