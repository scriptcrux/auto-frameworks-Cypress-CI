import Page from '../Page';

/**
 * Page Object representing Registration Success Confirmation.
 */
class SuccessPage extends Page {
  get successHeader(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains('Your Account Has Been Created!');
  }

  get continueButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains('a, button', 'Continue');
  }

  verifyRegistrationSuccess(): this {
    this.successHeader.should('be.visible');
    return this;
  }

  verifyRegistrationPageSuccessHeader(className?: string): this {
    if (className) {
      this.successHeader.should('have.class', className);
    } else {
      this.successHeader.should('be.visible');
    }
    return this;
  }

  selectContinueBtn(): this {
    this.continueButton.click();
    return this;
  }
}

export default new SuccessPage();
