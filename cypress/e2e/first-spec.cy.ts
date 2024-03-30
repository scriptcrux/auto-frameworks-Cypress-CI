import { fakerEN_IN as faker } from '@faker-js/faker';
import * as fs from 'fs';
import path from 'path';
import navigationPage from './pages/Accounts/NavigationPage';
import registerPage from './pages/Accounts/RegisterPage';
import successPage from './pages/Accounts/SuccessPage';
import myAccountPage from './pages/Accounts/MyAccountPage';
import loginPage from './pages/Accounts/LoginPage';

describe('template spec', () => {
  const fileNamecsv = 'cypress/fixtures/login.csv';
  const fileNamejson = 'cypress/fixtures/login.json';
  before('Navigation to portal', function () {
    cy.visit('/');
    cy.fixture('login.json').then(function (data) {
      this.newData = data[1];
    });
  });

  it('user is able to register', () => {
    //generating data
    const username = faker.person.firstName();
    const lastname = faker.person.lastName();
    const email = faker.internet.email();
    const cellNumber = faker.phone.number();
    const password = faker.internet.password();

    navigationPage.openMyAccountMenu();
    navigationPage.openRegisterPage();
    registerPage.completeRegistration(username, lastname, email, cellNumber, password, password, 'Yes');

    cy.readJSONFile(fileNamejson, { email, password });

    cy.readCSVFile(fileNamecsv, { email, password });

    // //moving to main page
    successPage.selectContinueBtn();

    //verifying logged in to welcome page
    myAccountPage.verifyAccountHeader('card-header');
  });

  it('user is able to login', function () {
    // cy.login(this.newData);
    // cy.login();

    // opening account menu
    navigationPage.openMyAccountMenu();

    //opening registration form
    navigationPage.openLoginPage();

    loginPage.login(this.newData.email, this.newData.password);

    loginPage.verifyPageURL('?route=account/account');

    // cy.contains('My Account');
    // cy.contains('My Orders');
    myAccountPage.verifyAccountHeader('card-header');
    myAccountPage.verifyOrderHeader('card-headers');
  });

  it('using single command to login', function () {
    // opening account menu
    navigationPage.openMyAccountMenu();

    //opening registration form
    navigationPage.openLoginPage();

    //without user
    // cy.login();

    //with user
    cy.login(this.newData);

    loginPage.verifyPageURL('?route=account/account');

    // cy.contains('My Account');
    // cy.contains('My Orders');
    myAccountPage.verifyAccountHeader('card-header');
    myAccountPage.verifyOrderHeader('card-headers');
  });
});
