import checkboxesPage from '../pages/CheckboxesPage';

describe('Checkboxes — with POM', () => {

  beforeEach(() => {
    checkboxesPage.visit();
  });

  it('should display two checkboxes', () => {
    checkboxesPage.verifyCount(2);
  });

  it('should check the first checkbox', () => {
    checkboxesPage
      .checkFirst()
      .verifyFirstIsChecked();
  });

  it('should uncheck the last checkbox', () => {
    checkboxesPage
      .uncheckLast()
      .verifyLastIsNotChecked();
  });

});
