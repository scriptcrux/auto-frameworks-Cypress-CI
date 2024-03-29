class Page {
  private get pageURL() {
    return cy.url();
  }
  verifyPageURL(partialPath: string) {
    this.pageURL.should('include', partialPath);
    this.pageURL.should('eq', `${Cypress.config().baseUrl}${partialPath}`);
  }
  //   verifyPageHeader(){

  //   }
}

export default Page;
