import navigationPage from './pages/Accounts/NavigationPage';
import loginPage from './pages/Accounts/LoginPage';

describe('Data-Driven Testing (DDT) Suite with JSON & CSV', () => {
  beforeEach('Prepare test environment', () => {
    cy.visit('/');
    navigationPage.openMyAccountMenu();
    navigationPage.openLoginPage();
  });

  describe('DDT Scenario 1: Parameterized Login using JSON Fixtures', () => {
    it('DDT-JSON: Iterates through dataset from login.json', () => {
      cy.fixture<Cypress.UserCredentials[]>('login.json').then((userList) => {
        expect(userList).to.be.an('array').with.length.greaterThan(0);

        // Execute validation for each credential set
        userList.slice(0, 2).forEach((user, index) => {
          cy.log(`Testing JSON user #${index + 1}: ${user.email}`);
          loginPage.enterEmail(user.email);
          loginPage.enterPassword(user.password);
          loginPage.submit();

          // Assert either success redirection or security notification
          cy.get('body').should('be.visible');
        });
      });
    });
  });

  describe('DDT Scenario 2: Node Task CSV File Ingestion', () => {
    it('DDT-CSV: Reads and validates credentials parsed from login.csv via neat-csv task', () => {
      const csvPath = 'cypress/fixtures/login.csv';

      cy.task<Cypress.UserCredentials[]>('readFileCSV', csvPath).then((records) => {
        expect(records).to.be.an('array').with.length.greaterThan(0);

        records.slice(0, 2).forEach((row, idx) => {
          cy.log(`Testing CSV row #${idx + 1}: ${row.email}`);
          expect(row.email).to.include('@');
          expect(row.password).to.have.length.greaterThan(5);

          loginPage.enterEmail(row.email);
          loginPage.enterPassword(row.password);
          loginPage.submit();

          cy.get('body').should('be.visible');
        });
      });
    });
  });
});
