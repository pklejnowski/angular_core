declare var appConfig: AppConfig;
interface AppConfig {
    AuthorizationUrl: string;
    ApiUrl: string;
    ClientUrl: string;
}

type Nullable<T> = T | undefined | null;
