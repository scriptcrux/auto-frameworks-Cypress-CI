import Page from '../Page';

/**
 * Page Object representing Product Catalog Search & Filtering.
 */
class ProductSearchPage extends Page {
  get searchInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('input[name="search"], [placeholder*="Search For Products"]').first();
  }

  get searchButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('button.type-text, button:contains("Search"), .search-button').first();
  }

  get productCards(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.product-thumb, .product-layout');
  }

  get productTitles(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.product-thumb h4 a, .product-layout .title a');
  }

  get sortDropdown(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#input-sort');
  }

  get emptySearchMessage(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains('p', 'There is no product that matches the search criteria.');
  }

  get searchHeader(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#content h1, .page-title');
  }

  /**
   * Performs product keyword search.
   * @param keyword Search term
   */
  search(keyword: string): this {
    this.searchInput.clear().type(`${keyword}{enter}`);
    return this;
  }

  /**
   * Sorts the product catalog by given option value or label.
   * @param sortValue Dropdown option value
   */
  sortBy(sortValue: string): this {
    this.sortDropdown.select(sortValue);
    return this;
  }

  /**
   * Adds the first matching product to cart directly from the product card.
   * @param productName Product title to match
   */
  addFirstProductToCart(): this {
    this.productCards.first().within(() => {
      cy.get('button[title="Add to Cart"], button.btn-cart').click({ force: true });
    });
    return this;
  }

  /**
   * Verifies that product search results contain the expected search term.
   */
  verifyResultsContain(expectedKeyword: string): this {
    this.productTitles.should('have.length.greaterThan', 0);
    this.productTitles.first().invoke('text').should('match', new RegExp(expectedKeyword, 'i'));
    return this;
  }

  /**
   * Verifies that the empty search notice is displayed.
   */
  verifyNoResults(): this {
    this.emptySearchMessage.should('be.visible');
    return this;
  }
}

export default new ProductSearchPage();
