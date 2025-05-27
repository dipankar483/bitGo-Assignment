/// <reference types="cypress" />


// cypress/e2e/blockStream/transactionParser.cy.js

describe('Transaction Parsing Test', () => {
  it('Prints transactions with exactly 1 input and 2 outputs', () => {
    cy.visit('https://blockstream.info/block/000000000000000000076c036ff5119e5a5a74df77abf64203473364509f7732');

    // Wait for page to load key elements, you can tune timeouts here if needed
    cy.get('#transaction-box', { timeout: 30000 }).should('be.visible');

    // Call the reusable command
    cy.parseAndPrintTxWithInputsOutputs();
  });
});
