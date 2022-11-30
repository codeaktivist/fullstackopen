describe('Blog app', () => {
    const newUser = {
        name: 'Martin',
        username: 'martin',
        password: 'asdf'
    }

    beforeEach(() => {

        cy.request('POST', 'http://localhost:3003/api/testing/reset')
            .then(response => {
                expect(response.status).eq(204)
            })
        cy.request({
            method: 'POST',
            url: 'http://localhost:3003/api/users',
            body: newUser
        })
            .then(response => {
                cy.log(response)
                expect(response.body.username).eq(newUser.username)
            })

        cy.visit('http://localhost:3000/')
    })
    it('login form is shown', () => {
        cy.contains('Please log in')

        cy.get('input')
            .then(response => {
                expect(response.length).eq(2)
            })
        cy.contains('Username:')
        cy.contains('Password:')
    })

    describe('Login', () => {
        it('succeeds with correct credentials', () => {
            cy.contains('Username')
                .find('input')
                .as('inputUsername')
                .type(newUser.username)
            cy.contains('Password:')
                .find('input')
                .type(newUser.password)
            cy.get('button')
                .click()
            cy.contains(`Logged-in as ${newUser.name}`)
        })

        it('fails with wrong credentials', () => {
            cy.contains('Username')
                .find('input')
                .as('inputUsername')
                .type(newUser.username)
            cy.contains('Password:')
                .find('input')
                .type('wrong')
            cy.get('button')
                .click()
            cy.contains('wrong password')
                .should('have.css', 'border-color', 'rgb(255, 0, 0)')     
                .and('have.class', 'notification warning')     
        })
    })
})