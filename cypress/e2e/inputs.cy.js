describe('Inputs Page', () => {

  beforeEach(() => {
    cy.visit('/inputs');
  });

  // הקלדה בשדה
  it('should type a number into the input field', () => {
    cy.get('input[type="number"]').type('42').should('have.value', '42');
  });

  // ניקוי שדה עם clear
  it('should clear the input field', () => {
    cy.get('input[type="number"]').type('999');
    cy.get('input[type="number"]').clear().should('have.value', '');
  });

  // מקשים מיוחדים: חצים למעלה ולמטה
  it('should use arrow keys to increment and decrement', () => {
    cy.get('input[type="number"]').type('10');
    cy.get('input[type="number"]').type('{uparrow}').should('have.value', '11');
    cy.get('input[type="number"]').type('{downarrow}').should('have.value', '10');
  });

  // selectall — בחירת הכל והחלפה
  it('should type, select all, and retype', () => {
    cy.get('input[type="number"]').type('123');
    cy.get('input[type="number"]')
      .type('{selectall}456')
      .should('have.value', '456');
  });

});
