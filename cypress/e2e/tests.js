import { v4 as uuidv6 } from 'uuid';

describe('Test cases for buying items from the shop', () => {
    it('Main test case: Complete shopping process', () => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false
        });

        cy.visit('');
        const username = uuidv6();
        const password = uuidv6();

        // register
        cy.log(username);
        cy.get('#signin2').click();
        cy.get('#sign-username').type(username, { force: true }); // during typing the input field loses the focus; workaround: force: true 
        cy.get('#sign-password').type(password);
        cy.get('[onclick="register()"]').click();
        // check browser popup
        cy.on('window:alert', (txt) => {    // this does only work when uncaught:exception is enabled
            expect(txt).to.contains('Sign up successful');
        })

        // login
        cy.get('#login2').click();
        cy.get('#loginusername').type(username, { force: true }); // during typing the input field loses the focus; workaround: force: true 
        cy.get('#loginpassword').type(password);
        cy.get('[onclick="logIn()"]').click();
        cy.get('#nameofuser').should('have.text', 'Welcome ' + username);

        // add 2 items to cart
        // item1
        cy.get('[onclick="byCat(\'notebook\')"]').click();
        cy.get('[href="prod.html?idp_=8"]:first').click();
        cy.get('[onclick="addToCart(8)"]').click();
        cy.on('window:alert', (txt) => {    // this does only work when uncaught:exception is enabled
            expect(txt).to.contains('Product added');
        })
        cy.get('.nav-item>[href="index.html"]').click();

        // item2
        cy.get('[onclick="byCat(\'monitor\')"]').click();
        cy.get('[href="prod.html?idp_=14"]:first').click();
        cy.get('[onclick="addToCart(14)"]').click();
        cy.on('window:alert', (txt) => {    // this does only work when uncaught:exception is enabled
            expect(txt).to.contains('Product added');
        })
        cy.get('.nav-item>[href="index.html"]').click();

        //item3
        cy.get('[onclick="byCat(\'phone\')"]').click();
        cy.get('[href="prod.html?idp_=3"]:first').click();
        cy.get('[onclick="addToCart(3)"]').click();
        cy.on('window:alert', (txt) => {    // this does only work when uncaught:exception is enabled
            expect(txt).to.contains('Product added');
        })

        // check cart total
        cy.get('#cartur').click();
        cy.get('#totalp').should('have.text', '1670');

        // delete smartphone Nexus 6 and check total
        cy.contains('tr', 'Nexus 6').find('a').click();
        cy.get('#totalp').should('have.text', '1020');

        // place order
        cy.get('.btn-success').click();
        cy.get('#orderModalLabel').should('have.text', 'Place order');
        cy.get('#name').type('Holger');
        cy.get('#country').type('DE', { force: true }); // during typing the input field loses the focus; workaround: force: true 
        cy.get('#city').type('HH');
        cy.get('#card').type('123456789');
        cy.get('#month').type('02');
        cy.get('#year').type('2024');
        cy.get('[onclick="purchaseOrder()"]').click();

        // check for success
        cy.get('.sa-placeholder').should('be.visible');
        cy.get('.sweet-alert > h2').should('have.text', 'Thank you for your purchase!');
        cy.get('.confirm').click();
    })

    it('Send contact formular', () => {
        cy.visit('');
        cy.get('a[data-target="#exampleModal"]').contains('Contact').click();
        cy.get('#recipient-email').type('test@abc.de', { force: true }); // during typing the input field loses the focus; workaround: force: true 
        cy.get('#recipient-name').type('Meier', { force: true }); // during typing the input field loses the focus; workaround: force: true 
        cy.get('#message-text').type('This is a test!');
        cy.get('[onclick="send()"]').click();
        cy.on('window:alert', (txt) => {
            expect(txt).to.contains('Thanks for the message!!');
        })
    })

    it('Register already existing user', () => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false
        });

        cy.visit('');
        const username = uuidv6();
        const password = uuidv6();

        // register
        cy.log(username);
        cy.get('#signin2').click();
        cy.get('#sign-username').type(username, { force: true }); // during typing the input field loses the focus; workaround: force: true 
        cy.get('#sign-password').type(password);
        cy.get('[onclick="register()"]').click();
        // check browser popup
        cy.on('window:alert', (txt) => {    // this does only work when uncaught:exception is enabled
            expect(txt).to.contains('Sign up successful.');
        })

        // register with the same username again
        cy.get('.nav-item>[href="index.html"]').click(); // make SignUp button clickable
        cy.get('#signin2').click();
        cy.get('#sign-username').clear();
        cy.get('#sign-password').clear();
        
        cy.get('#sign-username').type(username, { force: true }); // during typing the input field loses the focus; workaround: force: true 
        cy.get('#sign-password').type(password);
        cy.get('[onclick="register()"]').click();
        cy.on('window:alert', (abc) => {    // this does only work when uncaught:exception is enabled
            expect(abc).to.contains('This user already exist.');
        })
    })

    it('Validate mandatory fields in the Place-Order form', () => {
        // Name and Creditcard must be mandatory
        cy.visit('');
        cy.get('#cartur').click();
        cy.get('.btn-success').click();
        cy.get('#orderModalLabel').should('have.text', 'Place order');
        cy.get('[onclick="purchaseOrder()"]').click();

        // check for not success
        cy.on('window:alert', (txt) => {
            expect(txt).to.contains('Please fill out Name and Creditcard.');
        })
    })
})