describe('App test', () => {
  it('Renders table', () => {
    cy.visit('/')

    cy.get('tr').should('have.length', 3)
    cy.get('tr').eq(0).find('th').should('have.length', 3)
  })

  it('Adds columns', () => {
    let expectedColumnsLength = 3
    // Add new column
    cy.get('tr:first-child th:first-child div:first-child button:last-child')
      .click({ force: true })

    expectedColumnsLength++

    cy.get('tr:first-child th').should('have.length', expectedColumnsLength)
    cy.get('tr:first-child th:nth-child(2) input').should('have.value', 'New column 1')

    // Add new column to the right
    const baseColumnCssIndex = 3 // css indices are 1-based.
    cy.get(`tr:first-child th:nth-child(${baseColumnCssIndex}) div:first-child`).as('buttons')
      .find('button:last-child')
      .click({ force: true })

    expectedColumnsLength++

    cy.get('tr:first-child th').should('have.length', expectedColumnsLength)
    cy.get(`tr:first-child th:nth-child(${baseColumnCssIndex + 1}) input`).should('have.value', 'New column 3')

    // Add new column to the left
    cy.get('@buttons').find('button:first-child').click({ force: true })
    expectedColumnsLength++

    cy.get('tr:first-child th').should('have.length', expectedColumnsLength)
    cy.get(`tr:first-child th:nth-child(${baseColumnCssIndex}) input`).should('have.value', 'New column 2')
  })

  it('Edits cells', () => {
    cy.get('tr:nth-child(2) td:nth-child(2) input')
      .should('have.value', '')
      .type('xyz{enter}')
      .should('have.value', 'xyz')

    // just play with `within`
    cy.get('tr:nth-child(3) td:nth-child(3) input').within(($cellInput) => {
      cy.wrap($cellInput)
        .should('have.value', '')
        .type('abc{enter}')
        .should('have.value', 'abc')
    })

    cy.get('tr:nth-child(3) td:nth-child(4) input')
      .should('have.value', 'b1')
      .type('abc{selectAll}{del}')
      .should('have.value', '')
      .type('tyui{enter}')
      .should('have.value', 'tyui')
  })
})
