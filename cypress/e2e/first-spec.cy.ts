import { fakerEN_IN as faker } from '@faker-js/faker';
import navigationPage from './pages/Accounts/NavigationPage';
import registerPage from './pages/Accounts/RegisterPage';
import successPage from './pages/Accounts/SuccessPage';
import myAccountPage from './pages/Accounts/MyAccountPage';
import loginPage from './pages/Accounts/LoginPage';

describe('E-Commerce Authentication & User Management Suite', () => {
  const fileNameCsv = 'cypress/fixtures/login.csv';
  const fileNameJson = 'cypress/fixtures/login.json';

  beforeEach('Navigate to application portal', function () {
    cy.visit('/');
    cy.fixture<Cypress.UserCredentials[]>('login.json').then(function (data) {
      this.userData = data[1] || data[0];
    });
  });

  it('TC01: Registers a new user account with dynamic data and persists credentials', () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const cellNumber = faker.phone.number();
    const password = faker.internet.password({ length: 10 });

    navigationPage.openMyAccountMenu();
    navigationPage.openRegisterPage();

    registerPage.completeRegistration(
      firstName,
      lastName,
      email,
      cellNumber,
      password,
      password,
      'Yes'
    );

    // Persist registered credentials for data-driven regression runs
    cy.readJSONFile(fileNameJson, { email, password });
    cy.readCSVFile(fileNameCsv, { email, password });

    // Verify registration success and navigate to dashboard
    successPage.selectContinueBtn();
    myAccountPage.verifyAccountHeader();
  });

  it('TC02: Authenticates existing user via Page Object interactions', function () {
    navigationPage.openMyAccountMenu();
    navigationPage.openLoginPage();

    loginPage.login(this.userData.email, this.userData.password);
    loginPage.verifyPageURL('?route=account/account');

    myAccountPage.verifyAccountHeader();
    myAccountPage.verifyOrderHeader();
  });

  it('TC03: Authenticates using reusable custom command cy.login()', function () {
    cy.login(this.userData);
    loginPage.verifyPageURL('?route=account/account');

    myAccountPage.verifyAccountHeader();
    myAccountPage.verifyOrderHeader();
  });
});
