import navigationPage from '../e2e/pages/Accounts/NavigationPage';
import loginPage from '../e2e/pages/Accounts/LoginPage';

export default function addCustomCommands(): void {
  /**
   * Performs UI-based login flow.
   * If credentials are provided directly, uses them; otherwise falls back to fixture data.
   */
  Cypress.Commands.add('login', (userDetails?: Cypress.UserCredentials) => {
    const executeLogin = (email: string, pass: string) => {
      navigationPage.openMyAccountMenu();
      navigationPage.openLoginPage();
      loginPage.login(email, pass);
    };

    if (userDetails && userDetails.email && userDetails.password) {
      executeLogin(userDetails.email, userDetails.password);
    } else {
      cy.fixture<Cypress.UserCredentials[]>('login.json').then((data) => {
        const defaultUser = Array.isArray(data) ? data[0] : data;
        executeLogin(defaultUser.email, defaultUser.password);
      });
    }
  });

  /**
   * Appends an entry to a JSON file and writes back to disk.
   */
  Cypress.Commands.add('readJSONFile', (fileName: string, newEntry: Record<string, any>) => {
    cy.readFile(fileName).then((list) => {
      const records = Array.isArray(list) ? list : [list];
      records.push(newEntry);
      cy.writeFile(fileName, records);
    });
  });

  /**
   * Appends a user credential line to a CSV file using custom Node tasks.
   */
  Cypress.Commands.add('readCSVFile', (fileName: string, newEntry: Cypress.UserCredentials) => {
    const { email, password } = newEntry;
    cy.task<string>('readFileforStorage', fileName).then((existingContent) => {
      const updatedContent = `${existingContent?.trimEnd()}\n${email},${password}`;
      cy.task('writeFileCSV', { fileName, data: updatedContent });
    });
  });
}
