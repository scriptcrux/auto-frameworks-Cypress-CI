import Page from '../Page';

class LoginPage extends Page {
  get emailField() {
    return cy.contains('E-Mail Address').siblings('.form-control');
  }
  private get passField() {
    return cy.contains('Forgotten Password').prev('[placeholder="Password"]');
  }
  private get loginBtn() {
    return cy.get('form').children('input[type="submit"]');
  }

  login(email: string, pass: string) {
    this.emailField.type(email);
    this.passField.type(pass);
    this.loginBtn.click();
  }
}

export default new LoginPage();
