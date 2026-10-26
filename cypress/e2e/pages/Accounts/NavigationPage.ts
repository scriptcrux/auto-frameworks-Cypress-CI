/**
 * Page Object representing top navigation and header menu interactions.
 */
class NavigationPage {
  get myAccountMenu(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.dropdown-hoverable, #widget-navbar-217834').find('span:contains("My account")').first();
  }

  get registerLink(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.mz-sub-menu-96, .dropdown-menu').find('span:contains("Register"), a:contains("Register")').first();
  }

  get loginLink(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.mz-sub-menu-96, .dropdown-menu').find('span:contains("Login"), a:contains("Login")').first();
  }

  /**
   * Opens the My Account dropdown menu via mouseover.
   */
  openMyAccountMenu(): this {
    this.myAccountMenu.trigger('mouseover');
    return this;
  }

  /**
   * Navigates to the user registration page from the menu.
   */
  openRegisterPage(): this {
    this.registerLink.click({ force: true });
    return this;
  }

  /**
   * Navigates to the login page from the menu.
   */
  openLoginPage(): this {
    this.loginLink.click({ force: true });
    return this;
  }
}

export default new NavigationPage();
