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
      cy.wait(1000)
      // validate home page
      cy.contains('SOFTWARE SECURITY CENTER', { matchCase: false })
      // login with default creds

      cy.get('input[placeholder="Username"]').type('admin')
      cy.get('input[placeholder="Password"]').type('admin')
      cy.get('button[id="login"]').click()
      
      // Check for login status
      cy.url().then((currentUrl) => {
        // Assuming '/login' is still the URL if login fails
        if (currentUrl.includes('/login')) {
          // Retry login with the new password
          cy.get('input[placeholder="Username"]').type('admin')
          cy.get('input[placeholder="Password"]').type(Cypress.env('new_pwd'));
          cy.get('button[id="login"]').click()

          // Additional checks for successful login if necessary
          cy.url().should('include', '/dashboard');
          // validate dashboard
          cy.contains('Dashboard')
          cy.contains('Issues Remediated')
          cy.contains('Issues Pending Review')
        } else {
          // set admin password
          cy.get('input[id="oldPassword"]').type('admin')
          cy.wait(1000)
          cy.get('input[id="newpwd1"]').type(Cypress.env('new_pwd'))
          cy.wait(1000)
          cy.get('input[id="confirmPassword"]').type(Cypress.env('new_pwd'))
          cy.wait(1000)
          cy.get('button[id="save"]').click()

          // login with new creds
          cy.get('input[placeholder="Username"]').type('admin')
          cy.get('input[placeholder="Password"]').type(Cypress.env('new_pwd'))
          cy.get('button[id="login"]').click()

          cy.url().should('include', '/dashboard');
          // validate dashboard
          cy.contains('Dashboard')
          cy.contains('Issues Remediated')
          cy.contains('Issues Pending Review')
        }
      });
    })
  })
})
