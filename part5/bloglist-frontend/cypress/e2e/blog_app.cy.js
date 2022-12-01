describe('Blog app', () => {
    const newUser = {
        name: 'Martin',
        username: 'martin',
        password: 'asdf'
    }

    const newBlog = {
        title: 'A new note via cypress',
        author: 'Cypress Hill',
        url: 'www.cypress.de'
    }

    beforeEach(() => {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
            .then(response => {
                expect(response.status).eq(204)
            })
        cy.createUser(newUser)
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

    describe('when logged-in', () => {
        beforeEach(() => {
            cy.login({ username: newUser.username, password: newUser.password })
            cy.createBlog('First Blog', 'Mr. First', 'www.first.de')
            cy.createBlog('Second Blog', 'Mr. Second', 'www.second.de')
            cy.createBlog('Third Blog', 'Mr. Third', 'www.third.de')
            cy.visit('http://localhost:3000/')
        })

        it('A blog can be created', () => {
            cy.contains('Create new note')
                .click()
            cy.get('#titleInput').type(newBlog.title)
            cy.get('#authorInput').type(newBlog.author)
            cy.get('#urlInput').type(newBlog.url)

            cy.intercept('http://localhost:3000/api/blogs').as('waitForBlog')
            cy.get('button')
                .contains('Save')
                .click()
            cy.wait('@waitForBlog')
            cy.contains(newBlog.title)

            cy.get('.blog')
                .get('.title')
                .contains(newBlog.title)
        })

        it('A blog can be liked', () => {
            cy.get('.blog:first')
                .as('firstBlog')

            cy.get('@firstBlog')
                .find('button')
                .should('contain', 'show')
                .click()
                
            cy.get('@firstBlog')
                .find('.likes')
                .invoke('text')
                .then(before => Number(before.replace('Likes: ', '').replace('like', '')))
                .then(likesBefore => {
                    cy.get('@firstBlog')
                        .find('.likes')
                        .find('button')
                        .should('contain', 'like')
                        .click()
                    cy.get('@firstBlog')
                        .find('.likes')
                        .invoke('text')
                        .then(after => Number(after.replace('Likes: ', '').replace('like', '')))
                        .should('eq', likesBefore + 1)
                })
        })

        it('A user can delete her/his own blog', () => {
            cy.get('.blog:first')
                .as('firstBlog')
                .find('button')
                .should('contain', 'show')
                .click()
            
            cy.get('@firstBlog')
                .within($div => {
                    cy.get('button')
                        .contains('delete')
                        .click()
                })
                .should('not.exist')
        })

        it('A user can not delete anothers users blogs', () => {
            const anotherUser = {
                name: 'Dani',
                username: 'dani',
                password: 'jklö'
            }

            cy.createUser(anotherUser)
            cy.login({ username: anotherUser.username, password: anotherUser.password })
            cy.visit('http://localhost:3000/')

            cy.get('.blog:first')
                .as('firstBlog')
                .find('button')
                .should('contain', 'show')
                .click()
        
            cy.get('@firstBlog')
                .within($div => {
                    cy.get('button')
                        .should('not.contain', 'delete')
                })
        })

        it('Blogs are sorted by likes', () => {
            cy.get('.blog')
                .as('blogs')

            cy.get('@blogs')
                .eq(0)
                .as('firstBlog')

            cy.expand('@firstBlog')
            cy.addLike('@firstBlog')

            cy.get('@blogs')
                .eq(1)
                .as('secondBlog')

            cy.expand('@secondBlog')
            cy.addLike('@secondBlog')
            cy.addLike('@secondBlog')

            cy.get('@blogs')
                .eq(2)
                .as('thirdBlog')

            cy.expand('@thirdBlog')
            cy.addLike('@thirdBlog')
            cy.addLike('@thirdBlog')
            cy.addLike('@thirdBlog')

            cy.get('.blog')
                .eq(0)
                .should('contain', 'Third Blog')
            cy.get('.blog')
                .eq(1)
                .should('contain', 'Second Blog')     
            cy.get('.blog')
                .eq(2)
                .should('contain', 'First Blog')
        })
    })
})