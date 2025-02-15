export class placeOrderPage {
  elements = {
    // input form
    titel: () => cy.get('#orderModalLabel'),
    inputName: () => cy.get('#name'),
    inputCountry: () => cy.get('#country'),
    inputCity: () => cy.get('#city'),
    inputCard: () => cy.get('#card'),
    inputMonth: () => cy.get('#month'),
    inputYear: () => cy.get('#year'),
    buttonPurchase: () => cy.get('[onclick="purchaseOrder()"]'),

    // confirmation page
    iconSuccess: () => cy.get('.sa-placeholder'),
    infoTtext: () => cy.get('.sweet-alert > h2'),
    buttonCloseConfirmation: () => cy.get('.confirm')

  }

  checkTitel() {
    this.elements.titel().should('have.text', 'Place order')
  }

  fillForm(name, country, city, card, month, year) {
    this.elements.inputName().type(name)
    this.elements.inputCountry().type(country)
    this.elements.inputCity().type(city)
    this.elements.inputCard().type(card)
    this.elements.inputMonth().type(month)
    this.elements.inputYear().type(year)
  }

  submitForm() {
    this.elements.buttonPurchase().click()
  }

  checkConfirmationForm() {
    this.elements.iconSuccess().should('be.visible')
    this.elements.infoTtext().should('have.text', 'Thank you for your purchase!')
    this.elements.
    
    buttonCloseConfirmation().click()
  }

  checkWindowsAltert(expectedMessage) {
    cy.on('window:alert', (txt) => {    
      expect(txt).to.contains(expectedMessage)
    })
  }
}

export const placeOrderView = new placeOrderPage();
