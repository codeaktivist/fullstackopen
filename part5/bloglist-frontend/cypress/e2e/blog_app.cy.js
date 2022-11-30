describe('Blog app', () => {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
            .then(response => {
                expect(response.status).eq(204)
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
})