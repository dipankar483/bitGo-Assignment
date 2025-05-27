# BitGo Assignment: Cypress Automation Framework

This project is a robust, modular Cypress automation framework developed to automate transaction validations on the [Blockstream Explorer](https://blockstream.info/). It includes advanced DOM parsing, custom commands, reusable utilities, error handling, and rich HTML reporting.

## Features

- ✅ Clean and modular Cypress structure
- ✅ Custom reusable commands
- ✅ DOM-based transaction parsing (inputs/outputs)
- ✅ Dynamic waits and error handling
- ✅ Mochawesome HTML reports
- ✅ GitHub-ready structure

---
Folder Structure

ngx-cypress-test/
│
├── cypress/
│   ├── e2e/blockStream
│   │   └── blockTransactionHeading.cy.js   # Verify Header
        └── transactionParser.cy.js   # Transaction Parser
│   ├── support/
│   │   ├── commands.js             # Reusable custom Cypress commands
│   │   └── e2e.js                  # Test support setup
│   └── reports/
│       └── mochawesome-report/    # HTML reports
│
├── cypress.config.js              # Cypress configuration
├── package.json                   # NPM dependencies and scripts
└── README.md                      # Project documentation

---

Setup Instructions
1. Clone the Repository
git clone https://github.com/dipankar483/bitGo-Assignment.git
cd bitGo-Assignment
2. Install Dependencies
npm install
3. Running the Tests
Run All Specs :- npx cypress run
Run Specific Spec :- npx cypress run --spec "cypress/e2e/bitgo.spec.js"
Run in Cypress Test Runner (GUI):- npx cypress open
4. HTML Reporting with Mochawesome
Automatically Generated After Tests:
Open the report in browser:
- npx open cypress/reports/mochawesome-report/mochawesome.html

Make sure mochawesome is configured in cypress.config.js.

Regenerate Report (if needed): 
- npx marge mochawesome.json --reportDir=cypress/reports/mochawesome-report --reportFilename=mochawesome

---

Author
Dipankar Gogoi
Senior SDET | Cypress Automation | JavaScript
