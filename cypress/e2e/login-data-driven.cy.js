// Data-Driven Testing — בדיקה אחת שרצה על כמה תרחישים

// מערך של תרחישים — כל אובייקט = בדיקה אחת
const loginScenarios = [
  {
    title: 'valid credentials',
    username: 'tomsmith',
    password: 'SuperSecretPassword!',
    expectedUrl: '/secure',
    expectedMessage: 'You logged into a secure area!',
    expectedSelector: '.flash.success',
  },
  {
    title: 'invalid username',
    username: 'wronguser',
    password: 'SuperSecretPassword!',
    expectedUrl: '/login',
    expectedMessage: 'Your username is invalid!',
    expectedSelector: '.flash.error',
  },
  {
    title: 'invalid password',
    username: 'tomsmith',
    password: 'wrongpassword',
    expectedUrl: '/login',
    expectedMessage: 'Your password is invalid!',
    expectedSelector: '.flash.error',
  },
  {
    title: 'empty username',
    username: ' ',   // Cypress מתלונן על type ריק, אז רווח
    password: 'somepass',
    expectedUrl: '/login',
    expectedMessage: 'Your username is invalid!',
    expectedSelector: '.flash.error',
  },
];

describe('Login — Data-Driven Tests', () => {

  // forEach יוצר בדיקה נפרדת לכל תרחיש במערך
  loginScenarios.forEach((scenario) => {

    it(`should handle: ${scenario.title}`, () => {
      cy.visit('/login');
      cy.login(scenario.username, scenario.password);

      cy.url().should('include', scenario.expectedUrl);
      cy.get(scenario.expectedSelector)
        .should('be.visible')
        .and('contain', scenario.expectedMessage);
    });

  });

});
