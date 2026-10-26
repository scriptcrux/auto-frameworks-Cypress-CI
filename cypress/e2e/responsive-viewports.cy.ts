import productSearchPage from './pages/Catalog/ProductSearchPage';

describe('Cross-Device Responsive Viewport Suite', () => {
  const devices: Cypress.DevicePreset[] = ['desktop', 'tablet', 'mobile'];

  devices.forEach((device) => {
    context(`Responsive layout on: ${device.toUpperCase()}`, () => {
      beforeEach(() => {
        cy.setDeviceViewport(device);
        cy.visit('/');
      });

      it(`VIEWPORT-${device.toUpperCase()}: Adapts layout and header elements appropriately`, () => {
        if (device === 'mobile') {
          // Mobile navbar toggler is typically visible
          cy.get('body').should('be.visible');
          cy.get('button.navbar-toggler, .navbar-toggler, #entry_217830').should('exist');
        } else {
          // Desktop search and navbar are visible directly
          productSearchPage.searchInput.should('be.visible');
        }
      });

      it(`SEARCH-${device.toUpperCase()}: Executes product search across viewport size`, () => {
        cy.searchProduct('Apple');
        productSearchPage.verifyPageURL('route=product/search');
      });
    });
  });
});
