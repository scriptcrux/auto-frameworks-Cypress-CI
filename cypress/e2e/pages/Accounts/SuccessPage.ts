class SuccessPage {
  get pageHeader() {
    return cy.contains('Your Account Has Been Created!');
  }
  get ContinueBtn() {
    return cy.contains('Continue');
  }

  verifyRegistrationPageSuccessHeader(cls: string) {
    this.pageHeader.should('have.class', cls);
  }
  selectContinueBtn() {
    this.ContinueBtn.click();
  }
}

export default new SuccessPage();
