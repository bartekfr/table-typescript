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


  it('Adds rows', () => {
    let expectedRowsLength = 3
    // add column
    cy.get('tr:first-child th:first-child div:last-child button:last-child')
      .click({ force: true })
    expectedRowsLength++

    cy.get('tr').should('have.length', expectedRowsLength)
    cy.get('tr:nth-child(2) td input').each((cell) => {
      cy.wrap(cell).should('have.value', '')
    })

    // add column
    cy.get('tr:nth-child(3) th:first-child div:last-child button:last-child')
      .click({ force: true })
    expectedRowsLength++

    cy.get('tr').should('have.length', expectedRowsLength)
    cy.get('tr:nth-child(4) td input').each((cell) => {
      cy.wrap(cell).should('have.value', '')
    })

    // add column
    cy.get('tr:nth-child(3) th:first-child div:last-child button:first-child')
      .click({ force: true })
    expectedRowsLength++

    cy.get('tr').should('have.length', expectedRowsLength)
    cy.get('tr:nth-child(2) td input').each((cell) => {
      cy.wrap(cell).should('have.value', '')
    })
  })

  it('Edits cells', () => {
    cy.get('tr:nth-child(2) td:nth-child(2) input')
      .should('have.value', '')
      .type('xyz{enter}')
      .should('have.value', 'xyz')

    // just play with `within`
    cy.get('tr:nth-child(3) td:nth-of-type(2) input').within(($cellInput) => {
      cy.wrap($cellInput)
        .should('have.value', '')
        .type('abc{enter}')
        .should('have.value', 'abc')
    })

    cy.get('tr:nth-child(6) td:nth-child(4) input')
      .should('have.value', 'b1')
      .type('{selectAll}{del}')
      .should('have.value', '')
      .type('tyui{enter}')
      .should('have.value', 'tyui')

    cy.get('tr:nth-child(3) td:nth-child(3) input')
      .should('have.value', 'abc')
      .type('def{enter}')
      .should('have.value', 'abcdef')

    // columns headings
    cy.get('tr:nth-child(1) th:nth-child(4) input')
      .should('have.value', 'col 1')
      .type('{selectAll}{del}')
      .should('have.value', '')
      .type('ColTest{enter}')
      .should('have.value', 'ColTest')

    cy.get('tr:nth-child(1) th:last-child input')
      .should('have.value', 'col 2')
      .type('{selectAll}{del}ColTest{enter}')
      .should('have.value', 'ColTest')
  })

  it('Deletes columns', () => {
    let expectedColumnsLength = 6
    cy.get('tr:first-child th:nth-child(2) input').should('have.value', 'New column 1')
    cy.get('tr:first-child th:nth-child(2) div:first-child button:nth-child(2)')
      .click({ force: true })

    expectedColumnsLength--
    cy.get('tr:first-child th').should('have.length', expectedColumnsLength)
    cy.get('tr:first-child th:nth-child(2) input').should('have.value', 'New column 2')

    cy.get('tr:first-child th:last-child input').should('have.value', 'ColTest')
    cy.get('tr:first-child th:last-child div:first-child button:nth-child(2)')
      .click({ force: true })

    expectedColumnsLength--
    cy.get('tr:first-child th').should('have.length', expectedColumnsLength)
    cy.get('tr:first-child th:last-child input').should('have.value', 'New column 3')
  })

  it('Deletes rows', () => {
    let expectedRowsLength = 6
    cy.get('tr').should('have.length', expectedRowsLength)
    cy.get('tr:nth-child(4) td:nth-of-type(2) input').should('have.value', 'a1')
    cy.get('tr:nth-child(3) th').contains('2')
    cy.get('input[value="abcdef"]').as('cell')
    cy.get('tr:nth-child(3) th div:first-child button:nth-child(2)')
      .click({ force: true })

    expectedRowsLength--
    cy.get('tr').should('have.length', expectedRowsLength)
    cy.get('tr:nth-child(3) td:nth-of-type(2) input').should('have.value', 'a1')
    cy.get('input[value="abcdef"]').should('not.exist')

  })
})
