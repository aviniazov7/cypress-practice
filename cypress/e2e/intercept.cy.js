describe('Intercept — יירוט בקשות רשת', () => {

  // יירוט בקשה אמיתית + המתנה עד שתסתיים
  it('should wait for login request to complete', () => {
    cy.intercept('POST', '**/authenticate').as('loginRequest');

    cy.visit('/login');
    cy.login('tomsmith', 'SuperSecretPassword!');

    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response.statusCode).to.eq(303);
    });
  });

  // Mock — מחזיר תשובה מזויפת במקום לפנות לשרת
  it('should mock a GET request with fake data', () => {
    cy.intercept('GET', '**/users', {
      statusCode: 200,
      body: [
        { id: 1, name: 'Test User' },
        { id: 2, name: 'Mock User' }
      ]
    }).as('getUsers');

    cy.visit('/');
  });

  // סימולציית שגיאת שרת
  it('should simulate a 500 server error', () => {
    cy.intercept('GET', '**/users', {
      statusCode: 500,
      body: { error: 'Internal Server Error' }
    }).as('serverError');

    cy.visit('/');
  });

  // Mock מקובץ fixture
  it('should mock with data from fixture file', () => {
    cy.intercept('GET', '**/status_codes/*', {
      statusCode: 200,
      fixture: 'users.json'
    }).as('fromFixture');

    cy.visit('/status_codes');
  });

  // בדיקה שבקשה מסוימת נשלחה
  it('should verify a request was made on login', () => {
    cy.intercept('POST', '**/authenticate').as('auth');

    cy.visit('/login');
    cy.login('tomsmith', 'SuperSecretPassword!');

    cy.wait('@auth').its('request.method').should('eq', 'POST');
  });

});
