class MyAccountPage {
  get pageAccountHeader() {
    return cy.contains('My Account');
  }

  get pageOrderHeader() {
    return cy.contains('My Account');
  }

  verifyAccountHeader(cls: string) {
    this.pageAccountHeader.should('have.class', cls);
  }

  verifyOrderHeader(cls: string) {
    this.pageOrderHeader.should('have.class', cls);
  }
}

export default new MyAccountPage();
