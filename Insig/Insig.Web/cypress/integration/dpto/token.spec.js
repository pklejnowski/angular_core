/// <reference types="cypress" />

describe("Tests for AntiForgeryToken",
    function () {
        const identityUrl = Cypress.config("identityServerUrl");
        const testUser = Cypress.config("user");
        const testPassword = Cypress.config("password");

        Cypress.Commands.add("loginByToken",
            function (token, login, password) {
                cy.request({
                    method: "POST",
                    failOnStatusCode: false,
                    url: `${identityUrl}/Account/Login`,
                    form: true,
                    body: {
                        email: login,
                        password: password,
                        __RequestVerificationToken: token,
                        RememberLogin: false
                    }
                });
            });

        it("Should parse token from response body and return 200",
            function () {
                cy.request(`${identityUrl}/Account/Login`)
                    .its("body")
                    .then((body) => {
                        const $html = Cypress.$(body);
                        const token = $html.find("input[name=__RequestVerificationToken]").val();

                        cy.loginByToken(token, testUser, testPassword)
                            .then((resp) => {
                                expect(resp.status).to.eq(200);
                            });
                    });
            });

        it("Should return error 400 if token is wrong",
            function () {
                cy.loginByToken("wrong_token", testUser, testPassword)
                    .then((resp) => {
                        expect(resp.status).to.eq(400);
                    });
            });
    });