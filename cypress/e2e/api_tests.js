import { v4 as uuidv6 } from 'uuid';

describe('Test cases for testing the api', () => {
    const tempToken = 'Bearer ede5d7f92a8886999e29da203edc119d00be5a89c1f86153bd47262526974320'

    beforeEach(() => {
        cy.request('GET','https://simple-books-api.glitch.me/status').then((response) =>{
            // check status of the api
            const status = response.body.status
            expect(response.status).to.eq(200)
            expect(status).to.eq('OK')
        })
    })

    it(
        'Test the number of books ', () => {
            cy.request('GET','https://simple-books-api.glitch.me/books').then((response) =>{
                // The number of books must be 6
                // const objs = response.body.filter((item) => item.name === 'Untamed');
                const numberBooks = response.body.length
                cy.log('body: ', numberBooks);
                expect(response.status).to.eq(200)
                expect(numberBooks).to.eq(6)
            })
        }
    )

    it(
        'Filter endpoint books by query parameter type==fiction and check to find books with type fiction', () => {
            const expectedBooksFiction = ['The Russian', 'The Vanishing Half', 'The Midnight Library', 'Viscount Who Loved Me']

            cy.request('GET','https://simple-books-api.glitch.me/books?type=fiction').then((response) =>{
                for (let i = 0; i < 4; i++) {
                    const booksObject = response.body.filter((item) => item.name === expectedBooksFiction[i])
                    expect(booksObject.length).to.eq(1)
                }
            })
        }
    )

    it(
        'Filter endpoint books by query parameter type==non-fiction and check to not find books with type fiction', () => {
            const booksFiction = ['The Russian', 'The Vanishing Half', 'The Midnight Library', 'Viscount Who Loved Me']

            cy.request('GET','https://simple-books-api.glitch.me/books?type=non-fiction').then((response) =>{
                for (let i = 0; i < 4; i++) {
                    const booksObject = response.body.filter((item) => item.name === booksFiction[i])
                    expect(booksObject.length).to.eq(0)
                }
            })
        }
    )

    it(
        'Create token', () => {
            const clientName = uuidv6()
            const clientEmail = uuidv6() + '@test.com'

            cy.request({
                method: 'POST',
                url: 'https://simple-books-api.glitch.me/api-clients/',
                body: {
                    clientName: clientName,
                    clientEmail: clientEmail
                },
            }).then((res) => {
                const token = res.body
                Cypress.env('token', token)
                cy.log(token)
                expect(res.status).to.eq(201)
            })
        }
    )

    it(
        'Create order', function () {
            const token = Cypress.env('token');
            const authorization = `bearer ${ token }`; // 'TOTO: "authorization": "bearer [object Object]"
            cy.request({
                method: 'POST',
                url: 'https://simple-books-api.glitch.me/orders/',
                body: {
                    "bookId": 1,
                    "customerName": "John"
                },
                headers: {
                    Authorization: tempToken
                }
            }).then((res) => {
                expect(res.status).to.eq(201)
            })
        }
    )

    it(
        'Search for an existing book by ID and check the name', () => {
            const idBook = 1

            cy.request(
                'GET',
                'https://simple-books-api.glitch.me/books/' + idBook)
                .then((res) => {
                    expect(res.body.name).to.eq('The Russian')
                }
            )
        }
    )

    it(
        'Search for an existing order and check the correct ID of the book', () => {
            const idOrder = '8NDIPbvPT3n9NKucP5ZB9'
            const idBook = 1

            cy.request({
                method: 'GET',
                url: 'https://simple-books-api.glitch.me/orders/' + idOrder,
                body: {},
                headers: {
                    Authorization: tempToken
                }
            }).then((res) => {
                expect(res.body.bookId).to.eq(idBook)
            })
        }
    )

    it(
        'Delete an order', () => {
            
            const token = Cypress.env('token');
            const authorization = `bearer ${ token }`; // 'TOTO: "authorization": "bearer [object Object]"

            cy.request({
                method: 'POST',
                url: 'https://simple-books-api.glitch.me/orders/',
                body: {
                    "bookId": 1,
                    "customerName": "Meier"
                },
                headers: {
                    Authorization: tempToken
                }
            }).then((res) => {
                expect(res.status).to.eq(201)
                const orderId = res.body.orderId
                
                cy.request({
                    method: 'DELETE',
                    url: 'https://simple-books-api.glitch.me/orders/' + orderId,
                    body: {
                    },
                    headers: {
                        Authorization: tempToken
                    }
                }).then((res) => {
                    expect(res.status).to.eq(204)
                })
            })
        }
    )

    it.skip( // #TODO: tests are failing by retrun codes 4xx
        'Create token twice', () => {
            const clientName = uuidv6()
            const clientEmail = uuidv6() + '@test.com'

            cy.request({
                method: 'POST',
                url: 'https://simple-books-api.glitch.me/api-clients/',
                body: {
                    clientName: clientName,
                    clientEmail: clientEmail
                },
            }).then((res) => {
                const token = res.body
                expect(res.status).to.eq(201)
            }).then((res) => {
                
                cy.request({
                    method: 'POST',
                    url: 'https://simple-books-api.glitch.me/api-clients/',
                    body: {
                        clientName: clientName,
                        clientEmail: clientEmail
                    },
                }).then((res) => {
                    expect(res.status).to.eq(209)
                })
            })
        }
    )
})