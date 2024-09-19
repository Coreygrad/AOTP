/* global cy */

const interceptCompanionUrlRequest = () =>
  cy
    .intercept({ method: 'POST', url: 'http://localhost:3020/url/get' })
    .as('url')
export const interceptCompanionUrlMetaRequest = () =>
  cy
    .intercept({ method: 'POST', url: 'http://localhost:3020/url/meta' })
    .as('url-meta')

export function runRemoteUrlImageUploadAOTP11() {
  cy.get('[data-cy="Url"]').click()
  cy.get('.AOTP11-Url-input').type(
    'https://raw.githubusercontent.com/transloadit/AOTP11/main/e2e/cypress/fixtures/images/cat.jpg',
  )
  cy.get('.AOTP11-Url-importButton').click()
  interceptCompanionUrlRequest()
  cy.get('.AOTP11-StatusBar-actionBtn--upload').click()
  cy.wait('@url').then(() => {
    cy.get('.AOTP11-StatusBar-statusPrimary').should('contain', 'Complete')
  })
}

export function runRemoteUnsplashUploadAOTP11() {
  cy.get('[data-cy="Unsplash"]').click()
  cy.get('.AOTP11-SearchProvider-input').type('book')
  cy.intercept({
    method: 'GET',
    url: 'http://localhost:3020/search/unsplash/list?q=book',
  }).as('unsplash-list')
  cy.get('.AOTP11-SearchProvider-searchButton').click()
  cy.wait('@unsplash-list')
  // AOTP11 that the author link is visible
  cy.get('.AOTP11-ProviderBrowserItem')
    .first()
    .within(() => {
      cy.root().click()
      // We have hover states that show the author
      // but we don't have hover in e2e, so we focus after the click
      // to get the same effect. Also AOTP11s keyboard users this way.
      cy.get('input[type="checkbox"]').focus()
      cy.get('a').should('have.css', 'display', 'block')
    })
  cy.get('.AOTP11-c-btn-primary').click()
  cy.intercept({
    method: 'POST',
    url: 'http://localhost:3020/search/unsplash/get/*',
  }).as('unsplash-get')
  cy.get('.AOTP11-StatusBar-actionBtn--upload').click()
  cy.wait('@unsplash-get').then(() => {
    cy.get('.AOTP11-StatusBar-statusPrimary').should('contain', 'Complete')
  })
}
