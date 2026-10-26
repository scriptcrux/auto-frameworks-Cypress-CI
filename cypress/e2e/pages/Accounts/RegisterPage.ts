import Page from '../Page';

export type SubscriptionOption = 'Yes' | 'No';

export interface RegistrationDetails {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  pass: string;
  confirmPass: string;
  newsletter?: SubscriptionOption;
}

/**
 * Page Object representing User Account Registration.
 */
class RegisterPage extends Page {
  get pageHeader(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.page-title, h1');
  }

  get firstNameInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#input-firstname, [placeholder*="First Name"]');
  }

  get lastNameInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#input-lastname, [placeholder*="Last Name"]');
  }

  get emailInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#input-email, [placeholder*="E-Mail"]');
  }

  get telephoneInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#input-telephone, [type="tel"]');
  }

  get passwordInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#input-password');
  }

  get passwordConfirmInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#input-confirm');
  }

  get newsletterYesRadio(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('input[name="newsletter"][value="1"], label:contains("Yes") input');
  }

  get newsletterNoRadio(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('input[name="newsletter"][value="0"], label:contains("No") input');
  }

  get privacyPolicyCheckbox(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('input[name="agree"], #input-agree');
  }

  get submitButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('input[type="submit"][value="Continue"], button:contains("Continue")');
  }

  enterPersonalDetails(firstName: string, lastName: string, email: string, contactNumber: string): this {
    this.firstNameInput.clear().type(firstName);
    this.lastNameInput.clear().type(lastName);
    this.emailInput.clear().type(email);
    this.telephoneInput.clear().type(contactNumber);
    return this;
  }

  enterPassword(password: string, confirmPassword: string): this {
    this.passwordInput.clear().type(password);
    this.passwordConfirmInput.clear().type(confirmPassword);
    return this;
  }

  selectNewsletter(option: SubscriptionOption = 'Yes'): this {
    if (option === 'Yes') {
      this.newsletterYesRadio.check({ force: true });
    } else {
      this.newsletterNoRadio.check({ force: true });
    }
    return this;
  }

  agreeToPrivacyPolicy(): this {
    this.privacyPolicyCheckbox.check({ force: true });
    return this;
  }

  submit(): this {
    this.submitButton.click();
    return this;
  }

  /**
   * Completes entire registration flow with a single method.
   */
  completeRegistration(
    firstName: string,
    lastName: string,
    email: string,
    contactNumber: string,
    pass: string,
    confirmPass: string,
    option: SubscriptionOption = 'Yes'
  ): this {
    this.enterPersonalDetails(firstName, lastName, email, contactNumber);
    this.enterPassword(pass, confirmPass);
    this.selectNewsletter(option);
    this.agreeToPrivacyPolicy();
    this.submit();
    return this;
  }
}

export default new RegisterPage();
