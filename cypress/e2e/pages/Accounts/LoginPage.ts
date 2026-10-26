import Page from '../Page';

/**
 * Page Object representing the Account Login page.
 */
class LoginPage extends Page {
  get emailInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#input-email, [placeholder*="E-Mail"]');
  }

  get passwordInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#input-password, [placeholder*="Password"]');
  }

  get loginButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('input[type="submit"][value="Login"], button:contains("Login")');
  }

  get warningAlert(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.alert-danger');
  }

  /**
   * Enters email address.
   */
  enterEmail(email: string): this {
    this.emailInput.clear().type(email);
    return this;
  }

  /**
   * Enters password.
   */
  enterPassword(password: string): this {
    this.passwordInput.clear().type(password);
    return this;
  }

  /**
   * Clicks submit login button.
   */
  submit(): this {
    this.loginButton.click();
    return this;
  }

  /**
   * Performs full login flow.
   * @param email User email
   * @param password User password
   */
  login(email: string, pass: string): this {
    this.enterEmail(email);
    this.enterPassword(pass);
    this.submit();
    return this;
  }

  /**
   * Verifies that error warning alert is visible.
   */
  verifyErrorAlert(expectedMessage?: string): this {
    this.warningAlert.should('be.visible');
    if (expectedMessage) {
      this.warningAlert.should('contain.text', expectedMessage);
    }
    return this;
  }
}

export default new LoginPage();
