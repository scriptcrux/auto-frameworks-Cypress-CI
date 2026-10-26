import Page from '../Page';

/**
 * Page Object representing Shopping Cart and Checkout workflows.
 */
class CartPage extends Page {
  get cartRows(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.table-responsive tbody tr');
  }

  get quantityInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('input[name*="quantity"]').first();
  }

  get updateButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('button[data-original-title="Update"], button[type="submit"]').first();
  }

  get removeButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('button[data-original-title="Remove"], button.btn-danger').first();
  }

  get successBanner(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.alert-success');
  }

  get emptyCartNotice(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains('p', 'Your shopping cart is empty!');
  }

  get checkoutButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains('a', 'Checkout');
  }

  /**
   * Opens the Cart page directly.
   */
  openCart(): this {
    cy.visit('?route=checkout/cart');
    return this;
  }

  /**
   * Updates product quantity in cart.
   * @param quantity New numeric quantity
   */
  updateQuantity(quantity: number): this {
    this.quantityInput.clear().type(`${quantity}`);
    this.updateButton.click();
    return this;
  }

  /**
   * Removes the top item from the cart.
   */
  removeTopItem(): this {
    this.removeButton.click();
    return this;
  }

  /**
   * Verifies that the success alert confirms cart modification.
   */
  verifySuccessAlert(): this {
    this.successBanner.should('be.visible');
    return this;
  }

  /**
   * Verifies that the cart displays empty notification.
   */
  verifyCartIsEmpty(): this {
    this.emptyCartNotice.should('be.visible');
    return this;
  }
}

export default new CartPage();
