describe('Dropdown Page', () => {

  beforeEach(() => {
    cy.visit('/dropdown');
  });

  // בודק שיש 3 אופציות ב-dropdown
  it('should have 3 options in the dropdown', () => {
    cy.get('#dropdown option').should('have.length', 3);
  });

  // בחירה לפי טקסט
  it('should select Option 1 by visible text', () => {
    cy.get('#dropdown').select('Option 1').should('have.value', '1');
  });

  // בחירה לפי value
  it('should select Option 2 by value', () => {
    cy.get('#dropdown').select('2').should('have.value', '2');
  });

  // החלפת בחירה
  it('should change selection from Option 1 to Option 2', () => {
    cy.get('#dropdown').select('Option 1');
    cy.get('#dropdown').should('have.value', '1');

    cy.get('#dropdown').select('Option 2');
    cy.get('#dropdown').should('have.value', '2');
  });

});
