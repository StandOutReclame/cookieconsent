describe('Cookie consent', function() {
  it('Accept all cookies', function() {
    cy.visit('http://samenzwolle.jonathan.tf/categorie')

      cy.get('.cookieconsent__cookiebar__inner .cookieconsent__cookiebar__buttons .cookieconsent__cookiebar__button').click();

    cy.getCookie('CookieConsent').should('have.property', 'value', '{"marketing":true,"statistics":true,"preferences":true,"essential":true}')
  })
})

