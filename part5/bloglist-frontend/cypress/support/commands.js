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