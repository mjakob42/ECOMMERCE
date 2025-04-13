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
            // Want to ensure this sequence of messages / windows alerts
            const popups = [
                "Sign up successful.",
                "Product added.",
                "Product added.",
                "Product added."
            ]

            let counter = 0
            cy.on("window:alert", str => {
                expect(str).to.equal(popups[counter++])
                return true
            })

            cy.visit('');

            // register
            const username = uuidv6()
            const password = uuidv6()

            navigationView.menueItemSignUpClick()
            signUpView.signIn(username, password)

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
            productOverviewView.checkWindowsAltert('Product added.')

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
            contactView.checkWindowsAltert('Thanks for the message!!')
        }
    )

    it(
        'Register already existing user', () => {
            // Want to ensure this sequence of messages / windows alerts
            const popups = [
                "Sign up successful.",
                "This user already exist.",
            ]

            let counter = 0
            cy.on("window:alert", str => {
                expect(str).to.equal(popups[counter++])
                return true
            })

            cy.visit('');
            
            // register
            const username = uuidv6()
            const password = uuidv6()

            navigationView.menueItemSignUpClick()
            signUpView.signIn(username, password)

            // register with the same username again
            navigationView.menueItemHomeClick() // make SignUp button clickable
            navigationView.menueItemSignUpClick()
            signUpView.signIn(username, password)
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
            placeOrderView.checkWindowsAltert('Please fill out Name and Creditcard.')
        }
    )

    it(
        'Login with wrong password', () => {
            // Want to ensure this sequence of messages / windows alerts
            const popups = [
                "Sign up successful.",
                "Wrong password.",
            ]

            let counter = 0
            cy.on("window:alert", str => {
                expect(str).to.equal(popups[counter++])
                return true
            })

            cy.visit('');

            // register
            const username = uuidv6()
            const password = uuidv6()

            navigationView.menueItemSignUpClick()
            signUpView.signIn(username, password)

            // login with wrong password
            navigationView.menueItemLogInClick()
            loginView.login(username, 'WrongPassword')         
        }
    )
})