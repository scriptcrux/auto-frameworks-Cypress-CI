/**
 * Base Page Object representing common functionalities and assertions
 * across all web pages in the application.
 */
export default abstract class Page {
  /**
   * Retrieves the current page URL chainable.
   */
  get currentUrl(): Cypress.Chainable<string> {
    return cy.url();
  }

  /**
   * Retrieves the current page document title chainable.
   */
  get documentTitle(): Cypress.Chainable<string> {
    return cy.title();
  }

  /**
   * Navigates to a specific route relative to baseUrl.
   * @param path Relative path or route parameter
   */
  navigate(path = ''): this {
    cy.visit(path);
    return this;
  }

  /**
   * Verifies that the current URL includes the expected substring.
   * @param partialPath Substring expected in current URL
   */
  verifyPageURL(partialPath: string): this {
    this.currentUrl.should('include', partialPath);
    return this;
  }

  /**
   * Verifies that the page title contains expected text.
   * @param expectedTitle Expected document title substring
   */
  verifyPageTitle(expectedTitle: string): this {
    this.documentTitle.should('include', expectedTitle);
    return this;
  }
}
