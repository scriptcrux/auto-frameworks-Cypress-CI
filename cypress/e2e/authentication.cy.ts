import navigationPage from './pages/Accounts/NavigationPage';
import loginPage from './pages/Accounts/LoginPage';
import myAccountPage from './pages/Accounts/MyAccountPage';

describe('User Authentication Suite', () => {
  beforeEach('Navigate to login page', () => {
    cy.visit('/');
    navigationPage.openMyAccountMenu();
    navigationPage.openLoginPage();
  });

  it('AUTH-01: Successfully logs in with valid fixture credentials', () => {
    cy.fixture<Cypress.UserCredentials[]>('login.json').then((users) => {
      const validUser = users[0];
      loginPage.login(validUser.email, validUser.password);
      loginPage.verifyPageURL('?route=account/account');
      myAccountPage.verifyAccountHeader();
      myAccountPage.verifyOrderHeader();
    });
  });

  it('AUTH-02: Displays error alert when logging in with invalid credentials', () => {
    loginPage.login('invalid.user.sdettester@example.com', 'InvalidPassword123!');
    loginPage.verifyErrorAlert('Warning: No match for E-Mail Address and/or Password.');
  });

  it('AUTH-03: Logs in seamlessly using custom cy.login() command', () => {
    cy.login();
    loginPage.verifyPageURL('?route=account/account');
    myAccountPage.verifyAccountHeader();
  });
});
