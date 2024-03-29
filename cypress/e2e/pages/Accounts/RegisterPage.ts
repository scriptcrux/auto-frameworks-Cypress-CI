type subscriptionButton = 'Yes' | 'No';

class RegisterPage {
  get openMyAccountMenu() {
    return cy.get('.dropdown-hoverable').find('.info').find('span').filter(':contains("My account")');
  }

  get pageHeader() {
    return cy.get('.page-title');
  }

  get firstName() {
    return cy.get('.form-control').filter('[placeholder="First Name"]');
  }

  get LastName() {
    return cy.get('#input-lastname');
  }

  get emailField() {
    return cy.get('[placeholder="E-Mail"]');
  }

  get contactNum() {
    return cy.get('[type="tel"]');
  }

  get passwordField() {
    return cy.get('#input-password');
  }

  get passwordConfirm() {
    return cy.get('#input-confirm');
  }

  get subscriptionButton() {
    return cy.get('.custom-control-label').filter(`:contains('Yes')`).prev();
  }

  get privacyPolicyChkBox() {
    return cy.get('.custom-control-label').filter(':contains("I have read")').parent().children('#input-agree');
  }

  get submitRegistrationBtn() {
    return cy.get('[value="Continue"]');
  }

  enterPersonalDetails(firstName: string, lastName: string, email: string, contactNumber: string) {
    this.firstName.type(firstName);
    this.LastName.type(lastName);
    this.emailField.type(email);
    this.contactNum.type(contactNumber);
  }
  enterPassword(pass: string, confirmPass: string) {
    this.passwordField.type(pass);
    this.passwordConfirm.type(confirmPass);
  }

  enterNewsletter(option: subscriptionButton) {
    const subscriptionOption = option === 'Yes' ? '1' : '0';
    this.subscriptionButton.check(subscriptionOption, { force: true });
    this.privacyPolicyChkBox.click({ force: true });
    this.submitRegistrationBtn.click();
  }

  completeRegistration(
    firstName: string,
    lastName: string,
    email: string,
    contactNumber: string,
    pass: string,
    confirmPass: string,
    option: subscriptionButton
  ) {
    this.enterPersonalDetails(firstName, lastName, email, contactNumber);
    this.enterPassword(pass, confirmPass);
    this.enterNewsletter(option);
  }
}

export default new RegisterPage();
