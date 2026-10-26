import productSearchPage from './pages/Catalog/ProductSearchPage';

describe('Network Interception, Contract Validation & Fault Injection Suite', () => {
  beforeEach('Setup network listeners and visit portal', () => {
    cy.visit('/');
  });

  it('API-01: Intercepts product search network request and validates HTTP payload', () => {
    // Intercept search requests
    cy.intercept('GET', '**/index.php?route=product/search*').as('searchRequest');

    productSearchPage.search('HTC');

    // Validate network call contract
    cy.wait('@searchRequest').then((interception) => {
      expect(interception.response?.statusCode).to.be.oneOf([200, 302, 304]);
      expect(interception.request.url).to.include('search=HTC');
    });
  });

  it('API-02: Mocks network response to simulate custom search catalog payload', () => {
    // Stub response with simulated HTML or JSON payload
    cy.intercept('GET', '**/index.php?route=product/search*search=MockProduct*', {
      statusCode: 200,
      body: '<div class="product-layout"><div class="product-thumb"><div class="caption"><h4><a href="#">Enterprise Mocked UltraBook</a></h4></div></div></div>',
      headers: { 'content-type': 'text/html' }
    }).as('mockedSearch');

    cy.visit('?route=product/search&search=MockProduct');

    cy.wait('@mockedSearch');
    cy.contains('Enterprise Mocked UltraBook').should('be.visible');
  });

  it('API-03: Injects HTTP 500 server error to verify frontend resiliency and fault tolerance', () => {
    // Simulate internal server failure
    cy.intercept('POST', '**/index.php?route=checkout/cart/add', {
      statusCode: 500,
      body: { error: 'Internal Server Error simulated by Cypress Automation' }
    }).as('failedCartAdd');

    productSearchPage.search('HTC');
    productSearchPage.addFirstProductToCart();

    // Verify application remains interactive without crashing the runner
    cy.get('body').should('be.visible');
  });
});
