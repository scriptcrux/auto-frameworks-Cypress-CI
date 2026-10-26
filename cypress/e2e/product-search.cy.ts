import productSearchPage from './pages/Catalog/ProductSearchPage';

describe('Catalog Search & Product Discovery Suite', () => {
  beforeEach('Navigate to application home', () => {
    cy.visit('/');
  });

  it('SEARCH-01: Searches for products by keyword using Page Object Model', () => {
    productSearchPage.search('HTC');
    productSearchPage.verifyPageURL('route=product/search');
    productSearchPage.verifyResultsContain('HTC');
  });

  it('SEARCH-02: Performs product search using global custom command cy.searchProduct()', () => {
    cy.searchProduct('Apple');
    productSearchPage.verifyPageURL('route=product/search');
    productSearchPage.verifyResultsContain('Apple');
  });

  it('SEARCH-03: Displays informative notice when search query yields zero results', () => {
    productSearchPage.search('NonExistentProductXYZ123456');
    productSearchPage.verifyNoResults();
  });

  it('SEARCH-04: Sorts search results by price descending', () => {
    productSearchPage.search('Phone');
    // Sort dropdown option value for Price (High > Low) in OpenCart
    productSearchPage.sortDropdown.select('https://ecommerce-playground.lambdatest.io/index.php?route=product/search&search=Phone&sort=p.price&order=DESC');
    productSearchPage.verifyResultsContain('Phone');
  });
});
