import { v4 as uuidv6 } from 'uuid';

describe('Test cases for testing the api', () => {
    beforeEach(() => {
        cy.request('GET','https://simple-books-api.glitch.me/status').then((response) =>{
            // check status of the api
            const status = response.body.status
            expect(response.status).to.eq(200)
            expect(status).to.eq('OK')
        })
    })

    it('Test the number of books ', () => {
        cy.request('GET','https://simple-books-api.glitch.me/books').then((response) =>{
            // The number of books must be 6
            // const objs = response.body.filter((item) => item.name === 'Untamed');
            const numberBooks = response.body.length
            cy.log('body: ', numberBooks);
            expect(response.status).to.eq(200)
            expect(numberBooks).to.eq(6)
        })
    })

    it('Filter endpoint books by query parameter type==fiction and check to find books with type fiction', () => {
        const expectedBooks = ['The Russian', 'The Vanishing Half', 'The Midnight Library', 'Viscount Who Loved Me']

        cy.request('GET','https://simple-books-api.glitch.me/books?type=fiction').then((response) =>{
            for (let i = 0; i < 4; i++) {
                const booksObject = response.body.filter((item) => item.name === expectedBooks[i])
                expect(booksObject.length).to.eq(1)
            }
        })
    })

    it('Filter endpoint books by query parameter type==non-fiction and check to not find books with type fiction', () => {
        const expectedBooks = ['The Russian', 'The Vanishing Half', 'The Midnight Library', 'Viscount Who Loved Me']

        cy.request('GET','https://simple-books-api.glitch.me/books?type=non-fiction').then((response) =>{
            for (let i = 0; i < 4; i++) {
                const booksObject = response.body.filter((item) => item.name === expectedBooks[i])
                expect(booksObject.length).to.eq(0)
            }
        })
    })

    it('#TODO - Authentication - Create a token', () => {
        const username = uuidv6();
        const password = uuidv6();

        // cy.request('GET','https://simple-books-api.glitch.me/books?type=non-fiction').then((response) =>{
        //     for (let i = 0; i < 4; i++) {
        //         const booksObject = response.body.filter((item) => item.name === expectedBooks[i])
        //         expect(booksObject.length).to.eq(0)
        //     }
        // })
    })





})