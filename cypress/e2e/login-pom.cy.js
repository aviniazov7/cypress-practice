import loginPage from '../pages/LoginPage';

describe('Login Page — with Page Object Model', () => {

  beforeEach(() => {
    loginPage.visit();
  });

  // login מוצלח — שורה אחת, נקי וברור
  it('should login successfully', () => {
    loginPage
      .login('tomsmith', 'SuperSecretPassword!')
      .verifySuccessMessage('You logged into a secure area!');

    cy.url().should('include', '/secure');
  });

  // username שגוי
  it('should show error for invalid username', () => {
    loginPage
      .login('wronguser', 'SuperSecretPassword!')
      .verifyErrorMessage('Your username is invalid!');
  });

  // סיסמה שגויה
  it('should show error for invalid password', () => {
    loginPage
      .login('tomsmith', 'wrongpassword')
      .verifyErrorMessage('Your password is invalid!');
  });

  // שימוש בפעולות נפרדות (לא רק login מרוכז)
  it('should login with separate steps', () => {
    loginPage
      .typeUsername('tomsmith')
      .typePassword('SuperSecretPassword!')
      .clickSubmit()
      .verifySuccessMessage('You logged into a secure area!');
  });

});
