declare namespace Cypress {
  type UserDetails = {
    email: string;
    password: string;
  };
  type usercreds = { email: string; password: string };

  interface Chainable<Subject = any> {
    login(userDetail?: UserDetails): Chainable<any>;
    readJSONFile(fileName: string, newEntry: object): Chainable<any>;
    readCSVFile(fileName: string, newEntry: usercreds): Chainable<any>;
  }
}
