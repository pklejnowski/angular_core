import { UserManagerSettings } from 'oidc-client';

/* eslint-disable @typescript-eslint/naming-convention */
export class AuthSettings {
    static getClientSettings(): UserManagerSettings {
        return {
            authority: AppConfig.IdentityUrl,
            client_id: 'insig_spa',
            redirect_uri: `${AppConfig.ClientUrl}/auth-callback`,
            response_type: 'code',
            scope: 'openid profile email insigapi.read',
            automaticSilentRenew: true,
            silent_redirect_uri: `${AppConfig.ClientUrl}/assets/silent-refresh.html`
        };
    }
}
