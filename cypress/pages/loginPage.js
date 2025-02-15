export class loginPage {
  elements = {
    inputUsername: () => cy.get('#loginusername'),
    inputUpassword: () => cy.get('#loginpassword'),
    buttonSubmitLogin: () => cy.get('[onclick="logIn()"]')
  }

  login(username, password){
    this.elements.inputUsername().type(username, { force: true }); // during typing the input field loses the focus; workaround: force: true 
    this.elements.inputUpassword().type(password)
    this.elements.buttonSubmitLogin().click()
  }

  checkWindowsAltert(expectedMessage) {
    cy.on('window:alert', (txt) => {    
      expect(txt).to.contains(expectedMessage)
    })
  }
}

export const loginView = new loginPage();
