import { environment } from "environments/environment";
import { UserManagerSettings } from "oidc-client";

export function getClientSettings(): UserManagerSettings {
    return {
        authority: environment.authorizationUrl,
        client_id: "insig_spa",
        redirect_uri: environment.clientUrl + "auth-callback",
        response_type: "id_token token",
        scope: "openid profile email insigapi.read",
        automaticSilentRenew: true,
        silent_redirect_uri: environment.clientUrl + "assets/silent-refresh.html"
    };
}
