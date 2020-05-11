import { UserManagerSettings } from "oidc-client";

export function getClientSettings(): UserManagerSettings {
    return {
        authority: appConfig.AuthorizationUrl,
        client_id: "insig_spa",
        redirect_uri: appConfig.ClientUrl + "/auth-callback",
        response_type: "code",
        scope: "openid profile email insigapi.read",
        automaticSilentRenew: true,
        silent_redirect_uri: appConfig.ClientUrl + "/assets/silent-refresh.html"
    };
}
