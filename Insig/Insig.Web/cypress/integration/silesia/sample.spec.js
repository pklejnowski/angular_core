
/// <reference types="cypress" />

describe("Tests for sample page",
    function () {

        beforeEach(() => {
            cy.login();
            cy.visit("/sample");
        });

        it("Show sample page",
            function () {
                cy.get("[data-cy=title_string]").should("be.visible");
                cy.get("[data-cy=value_data]").should("be.visible");
                cy.get("[data-cy=value_add_button]").should("be.visible");
                cy.get("[data-cy=value_list]").should("be.visible");
            });

        it("Add sample data",
            function () {
                var valueToAdd = Date.now();

                cy.get("[data-cy=value_data]").type(valueToAdd);
                cy.get("[data-cy=value_add_button]").click(); // before-after | delay
                cy.get("[data-cy=value_list]").contains(valueToAdd).should("be.visible");  // cover by element button
            });

        it("Add exisiting value and check if toast and correct status code appears",
            function () {
                cy.server();
                cy.route("POST", "https://localhost:5001/values/samples").as("SendSampleData");

                var valueToAdd = "zxcv";
                cy.get("[data-cy=value_data]").type(valueToAdd);

                cy.get("[data-cy=value_add_button]").click();

                cy.wait("@SendSampleData");

                cy.get("@SendSampleData").then((xhr) => {
                    expect(xhr.status).to.eq(500);
                    expect(xhr.requestHeaders).to.have.property("Content-Type");
                    expect(xhr.method).to.eq("POST");
                });

                cy.get("#toast-container").contains("Operation failed").should("be.visible");
            });
    });
