export class cartPage {
  elements = {
    total: () => cy.get('#totalp'),
     productPhone1: () => cy.contains('tr', 'Nexus 6').find('a'),
     buttonPlaceOrder: () =>  cy.get('.btn-success')
    
  }

  checktoTal(total) {
    this.elements.total().should('have.text', total)
  }

  deleteProductPhone1() {
    this.elements.productPhone1().click()
  }

  placeOrderClick() {
    this.elements.buttonPlaceOrder().click()
  }
}

export const cartView = new cartPage();
