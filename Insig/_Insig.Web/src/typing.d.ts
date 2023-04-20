declare let appConfig: AppConfig;

interface AppConfig {
    identityUrl: string;
    apiUrl: string;
    clientUrl: string;
}

type Nullable<T> = T | undefined | null;
