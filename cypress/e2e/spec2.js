/// <reference types="Cypress" />

describe('Learning test cases', () => {
  it('Add product to cart', () => {
    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
    cy.get('.search-keyword').type('ca');
    cy.wait(2000);

    cy.get('.products').as('productsLocator');

    cy.get('.products')
      .find('.product')
      .each(($el, index, $list) => {
        const textVeg = $el.find('h4.product-name').text();
        if (textVeg.includes('Cashews')) {
          $el.find('button').click();
        }
      });
  });
});

/// <reference types="Cypress" />

// describe('My Second Test Suite', function()
// {

// it('My FirstTest case',function() {

// //Check boxes
// cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
// cy.get('#checkBoxOption1').check().should('be.checked').and('have.value','option1')
// cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
// cy.get('input[type="checkbox"]').check(['option2','option3'])

// //Static Dropdown

// cy.get('select').select('option2').should('have.value','option2')

// //Dynamic dropdowns
// cy.get('#autocomplete').type('ind')

// cy.get('.ui-menu-item div').each(($e1, index, $list) => {

//     if($e1.text()==="India")
//     {
//         cy.wrap($e1).click()
//     }

// })
// //autocomplete
// cy.get('#autocomplete').should('have.value','India')
// //visible invisible
// cy.get('#displayed-text').should('be.visible')
// cy.get('#hide-textbox').click()
// cy.get('#displayed-text').should('not.be.visible')
// cy.get('#show-textbox').click()
// cy.get('#displayed-text').should('be.visible')

// //radio buttons

// cy.get('[value="radio2"]').check().should('be.checked')
