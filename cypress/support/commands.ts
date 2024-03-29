// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => {});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import navigationPage from '../e2e/pages/Accounts/NavigationPage';
import loginPage from '../e2e/pages/Accounts/LoginPage';

export default function addCustomCommands() {
  Cypress.Commands.add('login', function (userDetails?) {
    let email: string, password: string;
    if (userDetails) {
      email = userDetails.email;
      password = userDetails.password;
    } else {
      cy.fixture('login.json').then(function (data) {
        this.newData = data[0];
      });
      email = this.newData.email;
      password = this.newData.password;
    }
    // cy.log('details-outside', email, password);
    //opening account menu
    // cy.get('.dropdown-hoverable').find('.info').find('span').filter(':contains("My account")').trigger('mouseover');
    navigationPage.openMyAccountMenu();

    //opening registration form
    // cy.get('.mz-sub-menu-96').find('.info').find('span').filter(':contains("Login")').click();
    navigationPage.openLoginPage();

    //typing email and password
    // cy.contains('E-Mail Address').siblings('.form-control').type(email);
    // cy.contains('Forgotten Password').prev('[placeholder="Password"]').type(password);
    loginPage.login(email, password);

    //logged in
    // cy.get('form').children('input[type="submit"]').click();
  });

  Cypress.Commands.add('readJSONFile', function (fileName: string, newEntry: object) {
    cy.readFile(fileName).then((list) => {
      list.push(newEntry);
      cy.log(JSON.stringify(list));
      cy.writeFile(fileName, list);
    });
  });

  type usercreds = { email: string; password: string };

  Cypress.Commands.add('readCSVFile', function (fileName: string, newEntry: usercreds) {
    const { email, password } = newEntry;
    cy.task('readFileforStorage', fileName).then((data) => {
      cy.log('dotage', data);
      const newData = `${data}\n${email},${password}`;
      cy.task('writeFileCSV', { fileName: fileName, data: newData });
    });
  });
}
