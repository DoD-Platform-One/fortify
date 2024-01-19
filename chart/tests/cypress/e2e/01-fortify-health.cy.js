describe('template spec', () => {
  it('.should() - allow user to signin', () => {
    cy.visit(Cypress.env('url'))
    cy.contains('SOFTWARE SECURITY CENTER', { matchCase: false })
    cy.get('input[placeholder="Username"]').type(Cypress.env('user'))
    cy.get('input[placeholder="Password"]').type(Cypress.env('password'))
    cy.get('button[id="login"]').click()
    cy.get('body').then($body => {
      if ($body.find('h3:contains("Change Password")').length > 0) {
        //Do nothing as password has not yet been set up
      } else {
        //Validate home page
        cy.contains('Dashboard')
        cy.contains('Issues Remediated')
        cy.contains('Issues Pending Review')
      }
    })
  })
})