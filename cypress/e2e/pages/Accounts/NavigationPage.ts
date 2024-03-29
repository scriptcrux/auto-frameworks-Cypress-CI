class Navigation {
  get myAccountMenu() {
    // return cy.contains(' My account');
    return cy.get('.dropdown-hoverable').find('.info').find('span').filter(':contains("My account")');
  }
  get registerPage() {
    return cy.get('.mz-sub-menu-96').find('.info').find('span').filter(':contains("Register")');
  }

  get loginPage() {
    return cy.get('.mz-sub-menu-96').find('.info').find('span').filter(':contains("Login")');
  }

  openMyAccountMenu() {
    this.myAccountMenu.trigger('mouseover');
  }

  openRegisterPage() {
    this.registerPage.click();
  }

  openLoginPage() {
    this.loginPage.click();
  }
}

export default new Navigation();
