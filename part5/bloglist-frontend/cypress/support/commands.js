Cypress.Commands.add('createUser', (user) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3003/api/users',
        body: user
    })
        .then(response => {
            expect(response.body.username).eq(user.username)
        })
})

Cypress.Commands.add('createBlog', (title, author, url) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/blogs',
        body: {title, author, url},
        headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('user')).token}`
        }
    })
})

Cypress.Commands.add('login', ({ username, password }) => {
    localStorage.clear()

    cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/login',
        body: { username, password }
    })
        .then(response => {
            localStorage.setItem('user', JSON.stringify(response.body))
        })
})

Cypress.Commands.add('expand', (blog) => {
    cy.get(blog)
        .find('button')
        .should('contain', 'show')
        .click()
})

Cypress.Commands.add('addLike', (blog) => {
    cy.get(blog)
        .find('.likes')
        .invoke('text')
        .then(before => Number(before.replace('Likes: ', '').replace('like', '')))
        .then(likesBefore => {
            cy.get(blog)
                .find('.likes')
                .find('button')
                .should('contain', 'like')
                .click()
            cy.get(blog)
                .find('.likes')
                .invoke('text')
                .then(after => Number(after.replace('Likes: ', '').replace('like', '')))
                .should('eq', likesBefore + 1)
        })
})