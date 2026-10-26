import productSearchPage from './pages/Catalog/ProductSearchPage';
import cartPage from './pages/Checkout/CartPage';

describe('Shopping Cart & Order Management Suite', () => {
  beforeEach('Navigate to application home', () => {
    cy.visit('/');
  });

  it('CART-01: Adds product to cart directly from catalog search results', () => {
    productSearchPage.search('HTC');
    productSearchPage.addFirstProductToCart();

    // Verify confirmation notification
    cy.assertNotification('Success: You have added');
  });

  it('CART-02: Navigates to cart and modifies product quantity', () => {
    // Add item first
    productSearchPage.search('HTC');
    productSearchPage.addFirstProductToCart();

    // Navigate to Cart Page
    cartPage.openCart();
    cartPage.verifyPageURL('route=checkout/cart');

    // Update quantity and assert feedback
    cartPage.updateQuantity(2);
    cartPage.verifySuccessAlert();
  });

  it('CART-03: Removes item from shopping cart and verifies empty state', () => {
    productSearchPage.search('HTC');
    productSearchPage.addFirstProductToCart();

    cartPage.openCart();
    cartPage.removeTopItem();

    // Assert cart emptiness notification
    cartPage.verifyCartIsEmpty();
  });
});
