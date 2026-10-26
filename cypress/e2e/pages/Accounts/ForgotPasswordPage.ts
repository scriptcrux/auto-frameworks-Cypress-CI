import Page from '../Page';

/**
 * Page Object representing the Forgot Password recovery flow.
 */
class ForgotPasswordPage extends Page {
  get emailInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#input-email, [placeholder*="E-Mail"]');
  }

  get continueButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('button[type="submit"], input[value="Continue"], button:contains("Continue")');
  }

  get backButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains('a', 'Back');
  }

  get successAlert(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.alert-success');
  }

  get dangerAlert(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.alert-danger');
  }

  /**
   * Navigates to the forgotten password page.
   */
  open(): this {
    cy.visit('?route=account/forgotten');
    return this;
  }

  /**
   * Submits password reset request for given email.
   * @param email Target user email
   */
  requestPasswordReset(email: string): this {
    this.emailInput.clear().type(email);
    this.continueButton.click();
    return this;
  }

  verifySuccessMessage(): this {
    this.successAlert.should('be.visible');
    return this;
  }

  verifyErrorMessage(): this {
    this.dangerAlert.should('be.visible');
    return this;
  }
}

export default new ForgotPasswordPage();
