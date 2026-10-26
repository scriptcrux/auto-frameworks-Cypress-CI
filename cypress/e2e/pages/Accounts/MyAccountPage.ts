import Page from '../Page';

/**
 * Page Object representing the User Account Dashboard.
 */
class MyAccountPage extends Page {
  get accountHeader(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains('.card-header, h2, h3', 'My Account');
  }

  get ordersHeader(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains('.card-header, h2, h3', 'My Orders');
  }

  get editAccountLink(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains('a', 'Edit your account information');
  }

  get logoutLink(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains('a', 'Logout');
  }

  verifyAccountHeaderVisible(): this {
    this.accountHeader.should('be.visible');
    return this;
  }

  verifyOrderHeaderVisible(): this {
    this.ordersHeader.should('be.visible');
    return this;
  }

  verifyAccountHeader(className = 'card-header'): this {
    this.accountHeader.should('have.class', className);
    return this;
  }

  verifyOrderHeader(className = 'card-header'): this {
    this.ordersHeader.should('have.class', className);
    return this;
  }
}

export default new MyAccountPage();
