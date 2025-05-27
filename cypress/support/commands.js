/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// cypress/support/commands.js

Cypress.Commands.add('verifyTransactionHeading', (expectedCount) => {
  cy.get('h3.font-h3', { timeout: 30000 })
    .should('be.visible')
    .invoke('text')
    .then(text => {
      const pattern = new RegExp(`^${expectedCount} of \\d+ Transactions$`);
      expect(text.trim()).to.match(pattern);
    });
});

Cypress.Commands.add('parseAndPrintTxWithInputsOutputs', () => {
  cy.get('#transaction-box', { timeout: 20000 }).should('exist');

  cy.get('#transaction-box .header', { timeout: 20000 }).should('have.length.at.least', 1).then(($headers) => {
    cy.get('#transaction-box .vins').then(($vins) => {
      cy.get('#transaction-box .vouts').then(($vouts) => {

        const matchedTxs = [];

        for (let i = 0; i < $headers.length; i++) {
          const $header = $headers[i];
          const $vin = $vins[i];
          const $vout = $vouts[i];

          // Tx hash
          const txHash = Cypress.$($header).find('a[href^="tx/"]').text().trim();

          // Count inputs and outputs
          const inputsCount = $vin ? Cypress.$($vin).find('.vin').length : 0;
          const outputsCount = $vout ? Cypress.$($vout).find('.vout').length : 0;

          // Only interested in exactly 1 input and 2 outputs
          if (inputsCount === 1 && outputsCount === 2) {
            // Extract the output addresses (inside <a> tags in vout-header-container spans)
            const outputAddresses = [];

            Cypress.$($vout).find('.vout-header-container > span > a').each((_, el) => {
              const addr = Cypress.$(el).text().trim();
              if (addr) {
                outputAddresses.push(addr);
              }
            });

            matchedTxs.push({
              transaction_hash: txHash,
              outputs: outputAddresses,
            });
          }
        }

        if (matchedTxs.length > 0) {
          cy.log(`Found ${matchedTxs.length} matching transactions:`);
          matchedTxs.forEach(tx => {
            cy.log(`Tx Hash: ${tx.transaction_hash}`);
            cy.log(`Outputs: ${tx.outputs.join(', ')}`);
          });
        } else {
          cy.log('No transactions matched the criteria of 1 input and 2 outputs.');
        }
      });
    });
  });
});
