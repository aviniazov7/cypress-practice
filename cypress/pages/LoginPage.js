// Page Object של דף Login
// כל הסלקטורים והפעולות של הדף במקום אחד

class LoginPage {

  // --- סלקטורים (ריכוז במקום אחד) ---
  elements = {
    usernameInput:  () => cy.get('#username'),
    passwordInput:  () => cy.get('#password'),
    submitButton:   () => cy.get('button[type="submit"]'),
    successMessage: () => cy.get('.flash.success'),
    errorMessage:   () => cy.get('.flash.error'),
    pageTitle:      () => cy.get('h2'),
    logoutButton:   () => cy.get('a[href="/logout"]'),
  };

  // --- פעולות (מה המשתמש עושה בדף) ---

  visit() {
    cy.visit('/login');
    return this;   // return this = מאפשר שרשור
  }

  typeUsername(username) {
    this.elements.usernameInput().type(username);
    return this;
  }

  typePassword(password) {
    this.elements.passwordInput().type(password);
    return this;
  }

  clickSubmit() {
    this.elements.submitButton().click();
    return this;
  }

  // פעולה מורכבת — login שלם בקריאה אחת
  login(username, password) {
    this.typeUsername(username);
    this.typePassword(password);
    this.clickSubmit();
    return this;
  }

  // --- בדיקות (assertions של הדף) ---

  verifySuccessMessage(text) {
    this.elements.successMessage()
      .should('be.visible')
      .and('contain', text);
    return this;
  }

  verifyErrorMessage(text) {
    this.elements.errorMessage()
      .should('be.visible')
      .and('contain', text);
    return this;
  }
}

// יוצרים מופע יחיד ומייצאים אותו
export default new LoginPage();
