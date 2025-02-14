export class productOverviewPage {
  elements = {
    menueItemCategoryPhones : () => cy.get('[onclick="byCat(\'phone\')"]'),
    menueItemCategoryLaptops : () => cy.get('[onclick="byCat(\'notebook\')"]'),
    menueItemCategoryMonitors : () => cy.get('[onclick="byCat(\'monitor\')"]'),

    // products
    productPhone1 : () => cy.get('[href="prod.html?idp_=3"]:first'),
    buttonAddProductPhone1ToCart : () => cy.get('[onclick="addToCart(3)"]'),

    productLaptop1 : () => cy.get('[href="prod.html?idp_=8"]:first'),
    buttonAddProductLaptop1ToCart : () => cy.get('[onclick="addToCart(8)"]'),

    productMonitor1 : () => cy.get('[href="prod.html?idp_=14"]:first'),
    buttonAddProductMonitor1ToCart : () => cy.get('[onclick="addToCart(14)"]')
  }

  clickCategoryPhones() {
    this.elements.menueItemCategoryPhones().click()
  }

  clickCategoryLaptobs() {
    this.elements.menueItemCategoryLaptops().click()
  }

  clickCategoryMonitors() {
    this.elements.menueItemCategoryMonitors().click()
  }

  addLaptop1ToCart() {
    this.elements.productLaptop1().click()
    this.elements.buttonAddProductLaptop1ToCart().click()

    cy.on('window:alert', (txt) => {    // this does only work when uncaught:exception is enabled
      expect(txt).to.contains('Product added');
    })
    cy.get('.nav-item>[href="index.html"]').click()
  }

  addMonitor1ToCart() {
    this.elements.productMonitor1().click()
    this.elements.buttonAddProductMonitor1ToCart().click()

    cy.on('window:alert', (txt) => {    // this does only work when uncaught:exception is enabled
      expect(txt).to.contains('Product added');
    })
    cy.get('.nav-item>[href="index.html"]').click()
  }

  addPhone1ToCart() {
    this.elements.productPhone1().click()
    this.elements.buttonAddProductPhone1ToCart().click()

    cy.on('window:alert', (txt) => {    // this does only work when uncaught:exception is enabled
      expect(txt).to.contains('Product added');
    })
    cy.get('.nav-item>[href="index.html"]').click()
  }
}

export const productOverviewView = new productOverviewPage();
