describe('App test', () => {
  it('Renders table', () => {
    cy.visit('/')

    cy.get('tr').should('have.length', 3)
  })
})
