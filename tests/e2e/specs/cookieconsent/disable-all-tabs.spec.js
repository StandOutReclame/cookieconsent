describe('Cookie consent', function() {
  it('Disables the cookies in all tabs', function() {
    cy.visit('http://samenzwolle.jonathan.tf/categorie')

      cy.get('.cookieconsent__cookiebar__inner .cookieconsent__cookiebar__buttons .cookieconsent__cookiebar__link').click();

      cy.get('.cookieconsent__tabs__tab:eq(2)').click();
      cy.get('.cookieconsent__content__item--active label.cookieconsent__checkbox').click();

      cy.get('.cookieconsent__tabs__tab:eq(3)').click();
      cy.get('.cookieconsent__content__item--active label.cookieconsent__checkbox').click();

      cy.get('.cookieconsent__tabs__tab:eq(4)').click();
      cy.get('.cookieconsent__content__item--active label.cookieconsent__checkbox').click();

      cy.get('.cookieconsent__button--refuse').click();

    cy.getCookie('CookieConsent').should('have.property', 'value', '{"marketing":false,"statistics":false,"preferences":false,"essential":true}')
  })
})

