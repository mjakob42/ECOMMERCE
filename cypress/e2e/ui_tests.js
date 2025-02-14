import { v4 as uuidv6 } from 'uuid'
import { loginView } from '../pages/loginPage'
import { signUpView } from '../pages/signUpPage'
import { navigationView } from '../pages/navigationPage'
import { productOverviewView } from '../pages/productOverviewPage'
import { cartView } from '../pages/cartPage'
import { placeOrderView } from '../pages/placeOrderPage'
import { contactView } from '../pages/contactPage'

describe('Test cases for buying items from the shop', () => {
    it(
        'Main test case: Complete shopping process', () => {
            Cypress.on('uncaught:exception', (err, runnable) => { // #TOTO: Analyse why uncaught:exception is thrown
                // returning false here prevents Cypress from
                // failing the test
                return false
            });

            cy.visit('');

            // register
            const username = uuidv6()
            const password = uuidv6()

            navigationView.menueItemSignUpClick()
            signUpView.signIn(username, password)
            signUpView.checkWindowsAlter('Sign up successful.')  // TODO: this does only work when uncaught:exception is enabled

            // login
            navigationView.menueItemLogInClick()
            loginView.login(username, password)
            navigationView.checkWelcomeText(username)

            // add 3 items to cart
            // item1
            productOverviewView.clickCategoryLaptobs()
            productOverviewView.addLaptop1ToCart()

            // item2
            productOverviewView.clickCategoryMonitors()
            productOverviewView.addMonitor1ToCart()

            //item3
            productOverviewView.clickCategoryPhones()
            productOverviewView.addPhone1ToCart()

            // check cart total
            navigationView.menueItemCartClick()
            cartView.checktoTal('1670')

            // delete smartphone Nexus 6 and check total
            cartView.deleteProductPhone1()
            cartView.checktoTal('1020')

            // place order
            cartView.placeOrderClick()

            placeOrderView.checkTitel()
            placeOrderView.fillForm('Holger', 'DE', 'HH', '123456789', '02', '2029')
            placeOrderView.submitForm()

            // check for success
            placeOrderView.checkConfirmationForm()
        }
    )

    it(
        'Submit an order without login', () => {
            cy.visit('');
            // add 1 item to cart
            productOverviewView.clickCategoryLaptobs()
            productOverviewView.addLaptop1ToCart()

            // check cart total
            navigationView.menueItemCartClick()
            cartView.checktoTal('790')

            // place order
            cartView.placeOrderClick()

            placeOrderView.checkTitel()
            placeOrderView.fillForm('Hans', 'DE', 'HH', '1234567891', '02', '2029')
            placeOrderView.submitForm()

            // check for success
            placeOrderView.checkConfirmationForm()
        }
    )

    it(
        'Send contact formular', () => {
            cy.visit('')
            
            navigationView.menueItemContactClick()
            contactView.fillForm('test@abc.de', 'Meier', 'This is a test')
            contactView.submitForm()
            contactView.checkWindowsAlter('Thanks for the message!!')
        }
    )

    it(
        'Register already existing user', () => {
            Cypress.on('uncaught:exception', (err, runnable) => { // TODO: this does only work when uncaught:exception is enabled
                // returning false here prevents Cypress from
                // failing the test
                return false
            })

            cy.visit('');
            
            // register
            const username = uuidv6()
            const password = uuidv6()

            navigationView.menueItemSignUpClick()
            signUpView.signIn(username, password)
            signUpView.checkWindowsAlter('Sign up successful.') // TODO: this does only work when uncaught:exception is enabled

            // register with the same username again
            navigationView.menueItemHomeClick() // make SignUp button clickable
            navigationView.menueItemSignUpClick()
            signUpView.signIn(username, password)
            signUpView.checkWindowsAlter('This user already exist.') // TODO: this does only work when uncaught:exception is enabled
        }
    )

    it(
        'Validate mandatory fields in the Place-Order form', () => {
            cy.visit('')

            // Name and Creditcard are be mandatory
            navigationView.menueItemCartClick()
            cartView.placeOrderClick()
            placeOrderView.checkTitel()
            placeOrderView.submitForm()

            // check for not success
            placeOrderView.checkWindowsAlter('Please fill out Name and Creditcard.')
        }
    )

    it(
        'Login with wrong password', () => {
            Cypress.on('uncaught:exception', (err, runnable) => { // #TOTO: Analyse why uncaught:exception is thrown
                // returning false here prevents Cypress from
                // failing the test
                return false
            });

            cy.visit('');

            // register
            const username = uuidv6()
            const password = uuidv6()

            navigationView.menueItemSignUpClick()
            signUpView.signIn(username, password)
            signUpView.checkWindowsAlter('Sign up successful.')  // TODO: this does only work when uncaught:exception is enabled

            // login with wrong password
            navigationView.menueItemLogInClick()
            loginView.login(username, 'WrongPassword')
            loginView.checkWindowsAlter('Wrong password.')  // TODO: this does only work when uncaught:exception is enabled           
        }
    )
})