describe('Note app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3000/api/testing/reset')
        const user = {
            name: 'Martin',
            username: 'martin',
            password: 'asdf'
        }
        cy.request('POST', 'http://localhost:3000/api/users', user)
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function () {
        cy.contains('Notes')
        cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
    })

    it('login fails with wrong password', function () {
        cy.contains('login').click()
        cy.get('#username').type('martin')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()

        cy.get('.error').should('contain', 'Wrong credentials')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')

        cy.get('html').should('not.contain', 'logged-in')
    })

    it('users can log-in', function () {
        cy.contains('login').click()
        cy.get('#username').type('martin')
        cy.get('#password').type('asdf')
        cy.get('#login-button').click()

        cy.contains('Martin logged-in')
    })

    describe('when logged-in', function () {
        beforeEach(function () {
            cy.login({ username: 'martin', password: 'asdf' })
        })

        it('create new note', function () {
            cy.contains('new note').click()
            cy.get('input').type('A new note by cypress')
            cy.contains('save').click()
            cy.contains('A new note by cypress')
            cy.contains('make important').click()
        })

        describe('and several notes exists', function () {
            beforeEach(function () {
                cy.createNote({ content: 'first note', important: false })
                cy.createNote({ content: 'second note', important: false })
                cy.createNote({ content: 'third note', important: false })
            })

            it('on of these can be set to  important', function () {
                cy.contains('second note')
                    .parent()
                    .find('button')
                    .as('theButton')
                    .click()

                cy.get('@theButton')
                    .contains('make not important')
            })

            it('example test', function () {
                cy.get('button')
                    .then(result => {
                        console.log(result)
                        debugger //eslint-disable-line
                    })
            })
        })



    })
})