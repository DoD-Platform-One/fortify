context('Assertions', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('url'))
  })

  describe('template spec', () => {
    // test sign-in
    it('.should() - allow user to signin', () => {

      // /users/sign_up is throwing an uncaught exception - we can continue the test by ignoring this single error
      cy.on('uncaught:exception', (err, runnable) => {
        expect(err.message).to.include('Cannot read')

        return false
      })

      // wait to load page
      cy.wait(2000)
      // validate home page
      cy.contains('SOFTWARE SECURITY CENTER')
      // click Administrators link
      cy.get('a[href="init.jsp"]').click()
      // validate Administrators page
      cy.contains('FORTIFY SOFTWARE SECURITY CENTER SETUP')
      // input invalid todken
      cy.get('input[placeholder="token"]').type('test')
      cy.get('button[id="submit"]').click()

      cy.contains('Unable to verify credentials')
    })
  })
})
