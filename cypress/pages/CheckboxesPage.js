// Page Object של דף Checkboxes
// דף: https://the-internet.herokuapp.com/checkboxes

class CheckboxesPage {

  // --- סלקטורים ---
  elements = {
    // כל ה-checkboxes בדף
    allCheckboxes: () => cy.get('input[type="checkbox"]'),
  };

  // --- פעולות ---

  visit() {
    cy.visit('/checkboxes');
    return this;
  }

  checkFirst() {
    this.elements.allCheckboxes().first().check();
    return this;
  }

  uncheckLast() {
    this.elements.allCheckboxes().last().uncheck();
    return this;
  }

  // --- בדיקות ---

  verifyCount(n) {
    this.elements.allCheckboxes()
      .should('have.length', n);
    return this;
  }

  verifyFirstIsChecked() {
    this.elements.allCheckboxes()
      .first()
      .should('be.checked');
    return this;
  }

  verifyLastIsNotChecked() {
    this.elements.allCheckboxes()
      .last()
      .should('not.be.checked');
    return this;
  }
}

export default new CheckboxesPage();