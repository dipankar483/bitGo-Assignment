/// <reference types="cypress" />

describe('Blockstream Block Transaction Heading Validation', () => {
  it('should verify that the transaction section heading is correct', () => {
    // Step 1: Visit the block details page
    cy.visit('https://blockstream.info/block/000000000000000000076c036ff5119e5a5a74df77abf64203473364509f7732');

    // Step 2: Wait for page and transactions section to load
    cy.contains('Transactions').scrollIntoView();

    // Step 3: Assert that the heading is correct
    //cy.contains('25 of 2875 Transactions').should('be.visible');
    cy.contains(/^\d+ of \d+ Transactions$/) // Use regex to match expected pattern
      .should('be.visible') // Assertion 1: Heading is visible
      .invoke('text')
      .then((text) => {
        // Assertion 2: Check the format explicitly
        const regex = /^(\d+) of (\d+) Transactions$/;
        const match = text.match(regex);

        expect(match, 'should match the expected pattern').to.not.be.null;

        const currentShown = parseInt(match[1]);
        const totalTxns = parseInt(match[2]);

        expect(currentShown).to.be.a('number').and.to.be.greaterThan(0);
        expect(totalTxns).to.be.a('number').and.to.be.greaterThan(currentShown);
      });
  });
});





