// בדיקות עם משתני סביבה
// הערכים נטענים אוטומטית לפי --env configFile=dev או staging

describe('Environment Config Tests', () => {

  // מדפיס לקונסול איזו סביבה רצה — שימושי לדיבוג
  it('should load correct environment', () => {
    const env = Cypress.env('environment');
    cy.log(`Running tests on: ${env}`);
    expect(env).to.be.oneOf(['dev', 'staging']);
  });

  // login עם פרטים מה-config במקום hardcoded
  it('should login using credentials from env config', () => {
    const username = Cypress.env('username');
    const password = Cypress.env('password');

    cy.visit('/login');
    cy.login(username, password);

    // אם זה dev — הפרטים נכונים והלוגין יצליח
    // אם זה staging — הפרטים שגויים ונקבל error
    if (Cypress.env('environment') === 'dev') {
      cy.url().should('include', '/secure');
    } else {
      cy.get('.flash.error').should('be.visible');
    }
  });

  // קריאת API לפי URL שמוגדר ב-env
  it('should call API using apiUrl from env', () => {
    const apiUrl = Cypress.env('apiUrl');

    cy.request(`${apiUrl}/users/1`).then((res) => {
      expect(res.status).to.eq(200);
    });
  });

});
