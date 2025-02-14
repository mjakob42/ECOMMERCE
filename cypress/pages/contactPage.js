export class contactPage {
  elements = {
    // input form
    inputEmail : () => cy.get('#recipient-email'),
    inputName : () => cy.get('#recipient-name'),
    inputMessage : () => cy.get('#message-text'),
    buttenSubmit : () => cy.get('[onclick="send()"]')
  }

  submitForm() {
    this.elements.buttenSubmit().click()
    // check browser popup
    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('Thanks for the message!!')
    })
  }

  fillForm(email, name, message) {
    this.elements.inputEmail().type(email, { force: true }) // during typing the input field loses the focus; workaround: force: true
    this.elements.inputName().type(name, { force: true }) // during typing the input field loses the focus; workaround: force: true
    this.elements.inputMessage().type(message)
  }

  checkWindowsAlter(expectedMessage) {
    cy.on('window:alert', (txt) => {    
      expect(txt).to.contains(expectedMessage)
    })
  }

}

export const contactView = new contactPage();
