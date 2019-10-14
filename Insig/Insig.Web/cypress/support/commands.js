var identityUrl = Cypress.config("identityServerUrl");
const testUser = Cypress.config("user");
const testPassword = Cypress.config("password");

Cypress.Commands.add("login", function () {
    cy.request(`${identityUrl}/Account/Login`)
        .its("body")
        .then((body) => {
            const $html = Cypress.$(body);
            const token = $html.find("input[name=__RequestVerificationToken]").val();

            cy.request({
                method: "POST",
                url: `${identityUrl}/Account/Login`,
                form: true,
                body: {
                    UserName: testUser,
                    Password: testPassword,
                    __RequestVerificationToken: token,
                    rememberLogin: false
                }
            });
        });
});