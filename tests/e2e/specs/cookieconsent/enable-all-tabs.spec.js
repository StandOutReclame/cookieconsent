describe('Cookie consent', function() {
  it('Enables the cookies in all tabs', function() {
    cy.visit('http://samenzwolle.jonathan.tf/categorie')

      cy.get('.cookieconsent__cookiebar__inner .cookieconsent__cookiebar__buttons .cookieconsent__cookiebar__link').click();
      cy.get('.cookieconsent__button--refuse').click();

    cy.getCookie('CookieConsent').should('have.property', 'value', '{"marketing":true,"statistics":true,"preferences":true,"essential":true}')
  })
})

