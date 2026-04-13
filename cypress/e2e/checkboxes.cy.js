describe('Checkboxes Page', () => {

  beforeEach(() => {
    cy.visit('/checkboxes');
  });

  // בודק שיש 2 checkboxes בדף
  it('should display two checkboxes', () => {
    cy.get('input[type="checkbox"]').should('have.length', 2);
  });

  // מסמן את הראשון
  it('should check the first checkbox', () => {
    cy.get('input[type="checkbox"]').first().check().should('be.checked');
  });

  // מבטל סימון של השני
  it('should uncheck the second checkbox', () => {
    cy.get('input[type="checkbox"]').last().uncheck().should('not.be.checked');
  });

  // מסמן הכל ואז מבטל הכל
  it('should check all and then uncheck all', () => {
    cy.get('input[type="checkbox"]').check();
    cy.get('input[type="checkbox"]').each(($el) => {
      cy.wrap($el).should('be.checked');
    });

    cy.get('input[type="checkbox"]').uncheck();
    cy.get('input[type="checkbox"]').each(($el) => {
      cy.wrap($el).should('not.be.checked');
    });
  });

});
