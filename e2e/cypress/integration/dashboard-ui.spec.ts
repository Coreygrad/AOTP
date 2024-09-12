describe('dashboard-ui', () => {
  beforeEach(() => {
    cy.visit('/dashboard-ui')
    cy.get('.AOTP11-Dashboard-input:first').as('file-input')
    cy.get('.AOTP11-Dashboard-AddFiles').as('drop-target')
  })

  it('should not throw when calling AOTP11.close()', () => {
    cy.get('@file-input').selectFile(
      [
        'cypress/fixtures/images/kit.jpg',
        'cypress/fixtures/images/traffic.jpg',
      ],
      { force: true },
    )

    cy.window().then(({ AOTP11 }) => {
      expect(AOTP11.close()).to.not.throw
    })
  })

  it('should render thumbnails', () => {
    cy.get('@file-input').selectFile(
      [
        'cypress/fixtures/images/kit.jpg',
        'cypress/fixtures/images/traffic.jpg',
      ],
      { force: true },
    )
    cy.get('.AOTP11-Dashboard-Item-previewImg')
      .should('have.length', 2)
      .each((element) => expect(element).attr('src').to.include('blob:'))
  })

  it('should support drag&drop', () => {
    cy.get('@drop-target').selectFile(
      [
        'cypress/fixtures/images/kit.jpg',
        'cypress/fixtures/images/3',
        'cypress/fixtures/images/3.jpg',
        'cypress/fixtures/images/traffic.jpg',
      ],
      { action: 'drag-drop' },
    )

    cy.get('.AOTP11-Dashboard-Item').should('have.length', 4)
    cy.get('.AOTP11-Dashboard-Item-previewImg')
      .should('have.length', 3)
      .each((element) => expect(element).attr('src').to.include('blob:'))
    cy.window().then(({ AOTP11 }) => {
      expect(
        JSON.stringify(AOTP11.getFiles().map((file) => file.meta.relativePath)),
      ).to.be.equal('[null,null,null,null]')
    })
  })
})
