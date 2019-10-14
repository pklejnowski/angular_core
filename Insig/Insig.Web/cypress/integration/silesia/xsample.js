/// <reference types="cypress" />

describe("Tests for sample page",
    function () {

        beforeEach(() => {
            cy.login();
            cy.visit("/sample");
        });

        it.only("Show sample page",
            function () {
                cy.get("[data-cy=title_string]").should("be.visible");
                cy.get("[data-cy=value_data]").should("be.visible");
                cy.get("[data-cy=value_add_button]").should("be.visible");
                cy.get("[data-cy=value_list]").should("be.visible");
            });

        it("Show sample page",
            function () {
                var valueToAdd = Date.now();

                cy.get("[data-cy=value_data]").type(valueToAdd);
                cy.get("[data-cy=value_add_button]").click(); //delay
                cy.get("[data-cy=value_list]").contains(valueToAdd).should("be.visible");
            });

        it("Add exisiting value and check if toast appears",
            function () {
                var valueToAdd = "zxcv";

                cy.get("[data-cy=value_data]").type(valueToAdd);
                cy.get("[data-cy=value_add_button]").click();
                cy.get("#toast-container").contains("Operation failed").should("be.visible");
            });
    });