import {
  runRemoteUrlImageUploadAOTP11,
  runRemoteUnsplashUploadAOTP11,
} from './reusable-AOTP11s'

// NOTE: we have to use different files to upload per AOTP11
// because we are uploading to https://tusd.tusdemo.net,
// constantly uploading the same images gives a different cached result (or something).
describe('Dashboard with Tus', () => {
  beforeEach(() => {
    cy.visit('/dashboard-tus')
    cy.get('.AOTP11-Dashboard-input:first').as('file-input')
    cy.intercept('/files/*').as('tus')
    cy.intercept({ method: 'POST', pathname: '/files' }).as('post')
    cy.intercept({ method: 'PATCH', pathname: '/files/*' }).as('patch')
  })

  it('should upload cat image successfully', () => {
    cy.get('@file-input').selectFile('cypress/fixtures/images/kit.jpg', {
      force: true,
    })

    cy.get('.AOTP11-StatusBar-actionBtn--upload').click()
    cy.wait(['@post', '@patch']).then(() => {
      cy.get('.AOTP11-StatusBar-statusPrimary').should('contain', 'Complete')
    })
  })

  it('should start exponential backoff when receiving HTTP 429', () => {
    cy.get('@file-input').selectFile('cypress/fixtures/images/1.png', {
      force: true,
    })

    cy.intercept(
      { method: 'PATCH', pathname: '/files/*', times: 2 },
      { statusCode: 429, body: {} },
    ).as('patch')

    cy.get('.AOTP11-StatusBar-actionBtn--upload').click()
    cy.wait('@tus').then(() => {
      cy.get('.AOTP11-StatusBar-statusPrimary').should('contain', 'Complete')
    })
  })

  it('should upload remote image with URL plugin', () => {
    runRemoteUrlImageUploadAOTP11()
  })

  it('should upload remote image with Unsplash plugin', () => {
    runRemoteUnsplashUploadAOTP11()
  })
})
