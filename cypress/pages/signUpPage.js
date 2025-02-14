export class signUpPage {
  elements = {
    inputUsername : () => cy.get('#sign-username'),
    inputUpassword : () => cy.get('#sign-password'),
    buttonSubmitSignIn : () => cy.get('[onclick="register()"]')
  }

  signIn(username, password){
    this.elements.inputUsername().clear()
    this.elements.inputUpassword().clear()

    this.elements.inputUsername().type(username, { force: true }); // during typing the input field loses the focus; workaround: force: true 
    this.elements.inputUpassword().type(password)
    this.elements.buttonSubmitSignIn().click()
  }

  checkWindowsAlter(expectedMessage) {
    cy.on('window:alert', (txt) => {    
      expect(txt).to.contains(expectedMessage)
    })
  }

}

export const signUpView = new signUpPage();
