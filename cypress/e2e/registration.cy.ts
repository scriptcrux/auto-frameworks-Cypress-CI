import { fakerEN_IN as faker } from '@faker-js/faker';
import navigationPage from './pages/Accounts/NavigationPage';
import registerPage from './pages/Accounts/RegisterPage';
import successPage from './pages/Accounts/SuccessPage';
import myAccountPage from './pages/Accounts/MyAccountPage';

describe('User Registration & Data Persistence Suite', () => {
  const fileNameCsv = 'cypress/fixtures/login.csv';
  const fileNameJson = 'cypress/fixtures/login.json';

  beforeEach('Navigate to registration page', () => {
    cy.visit('/');
    navigationPage.openMyAccountMenu();
    navigationPage.openRegisterPage();
  });

  it('REG-01: Successfully completes registration and captures test data', () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email().toLowerCase();
    const cellNumber = faker.phone.number();
    const password = faker.internet.password({ length: 12 });

    registerPage.completeRegistration(
      firstName,
      lastName,
      email,
      cellNumber,
      password,
      password,
      'Yes'
    );

    // Dynamic fixture persistence for downstream pipelines
    cy.readJSONFile(fileNameJson, { email, password });
    cy.readCSVFile(fileNameCsv, { email, password });

    successPage.verifyRegistrationSuccess();
    successPage.selectContinueBtn();

    myAccountPage.verifyAccountHeader();
  });
});
