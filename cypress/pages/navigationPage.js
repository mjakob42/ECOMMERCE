export class navigationPage {
  elements = {
    menueItemSignUp: () => cy.get('#signin2'),
    menueItemLogIn: () => cy.get('#login2'),
    menueItemWelcome: () =>  cy.get('#nameofuser'),
    menueItemCart: () =>  cy.get('#cartur'),
    menueItemContact: () =>  cy.get('a[data-target="#exampleModal"]').contains('Contact'),
    menueItemHome: () =>  cy.get('.nav-item>[href="index.html"]')
  }

  menueItemSignUpClick() {
    this.elements.menueItemSignUp().click()
  }

  menueItemLogInClick() {
    this.elements.menueItemLogIn().click()
  }

  checkWelcomeText(username) {
    this.elements.menueItemWelcome().should('have.text', 'Welcome ' + username)
  }

  menueItemCartClick() {
    this.elements.menueItemCart().click()
  }

  menueItemContactClick() {
    this.elements.menueItemContact().click()
  }

  menueItemHomeClick() {
    this.elements.menueItemHome().click()
  }
}

export const navigationView = new navigationPage();
