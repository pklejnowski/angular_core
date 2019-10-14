/// <reference types="cypress" />

describe("Tests for Login page",
    function () {
        const identityUrl = Cypress.config("identityServerUrl");
        const testUser = Cypress.config("user");
        const testPassword = Cypress.config("password");

        beforeEach(function () {
            cy.visit(`${identityUrl}/account/login`);
        });

        it("Should successfully load",
            function () {
                cy.get(".mt-5.mb-3").contains("Login").should("be.visible");    // class
                cy.get("label").contains("Username").should("be.visible");  // element
                cy.get("label").contains("Password").should("be.visible");
                cy.get("[type='checkbox']").should("have.attr", "name", "RememberLogin");   // attributes
                cy.get("[type='checkbox']").check().should("be.checked").should("be.visible");
                cy.get("button").contains("Login").should("be.visible");
            });

        it("Should validate when login and password is not provided",
            function () {
                cy.get("#logInButton").click();

                cy.get(".validation-summary-errors").contains("The Username field is required.").should("be.visible"); // nested content
                cy.get(".validation-summary-errors").contains("The Password field is required.").should("be.visible");
            });

        it("Should validate when login and password is invalid",
            function () {
                cy.get("[data-cy=username]").type("zxcv");
                cy.get("[data-cy=password]").type("qwerty");
                cy.get("[data-cy=login_button]").click();

                cy.contains("Invalid username or password").should("be.visible");
            });

        it("Should log into application when login and password is correct",
            function () {
                cy.get("[data-cy=username]")
                    .type(testUser)
                    .should("have.value", testUser);

                cy.get("[data-cy=password]")
                    .type(testPassword)
                    .should("have.value", testPassword);

                cy.get("[data-cy=login_button]").click();

                cy.contains('Welcome to AuthServer').should("be.visible");
            });
    });