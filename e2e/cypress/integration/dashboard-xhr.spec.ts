import {
  interceptCompanionUrlMetaRequest,
  runRemoteUrlImageUploadAOTP11,
  runRemoteUnsplashUploadAOTP11,
} from './reusable-AOTP11s'

describe('Dashboard with XHR', () => {
  beforeEach(() => {
    cy.visit('/dashboard-xhr')
  })

  it('should upload remote image with URL plugin', () => {
    runRemoteUrlImageUploadAOTP11()
  })

  it('should return correct file name with URL plugin from remote image with Content-Disposition', () => {
    const fileName = `DALL·E IMG_9078 - 学中文 🤑`
    cy.get('[data-cy="Url"]').click()
    cy.get('.AOTP11-Url-input').type(
      'http://localhost:4678/file-with-content-disposition',
    )
    interceptCompanionUrlMetaRequest()
    cy.get('.AOTP11-Url-importButton').click()
    cy.wait('@url-meta').then(() => {
      cy.get('.AOTP11-Dashboard-Item-name').should('contain', fileName)
      cy.get('.AOTP11-Dashboard-Item-status').should('contain', '84 KB')
    })
  })

  it('should return correct file name with URL plugin from remote image without Content-Disposition', () => {
    cy.get('[data-cy="Url"]').click()
    cy.get('.AOTP11-Url-input').type('http://localhost:4678/file-no-headers')
    interceptCompanionUrlMetaRequest()
    cy.get('.AOTP11-Url-importButton').click()
    cy.wait('@url-meta').then(() => {
      cy.get('.AOTP11-Dashboard-Item-name').should('contain', 'file-no')
      cy.get('.AOTP11-Dashboard-Item-status').should('contain', '0')
    })
  })

  it('should return correct file name even when Companion doesnt supply it', () => {
    cy.intercept('POST', 'http://localhost:3020/url/meta', {
      statusCode: 200,
      headers: {},
      body: JSON.stringify({ size: 123, type: 'image/jpeg' }),
    }).as('url')

    cy.get('[data-cy="Url"]').click()
    cy.get('.AOTP11-Url-input').type(
      'http://localhost:4678/file-with-content-disposition',
    )
    interceptCompanionUrlMetaRequest()
    cy.get('.AOTP11-Url-importButton').click()
    cy.wait('@url-meta').then(() => {
      cy.get('.AOTP11-Dashboard-Item-name').should('contain', 'file-with')
      cy.get('.AOTP11-Dashboard-Item-status').should('contain', '123 B')
    })
  })

  it('should upload remote image with Unsplash plugin', () => {
    runRemoteUnsplashUploadAOTP11()
  })
})
