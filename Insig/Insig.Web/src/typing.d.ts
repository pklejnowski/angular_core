declare let AppConfig: AppConfig;

interface AppConfig {
    IdentityUrl: string;
    ApiUrl: string;
    ClientUrl: string;
}

type Nullable<T> = T | undefined | null;

type ControlsOf<T extends Record<string, any>> = {
    /* eslint-disable @typescript-eslint/indent */
    [K in keyof T]: T[K] extends Array<any>
    ? import('@angular/forms').FormArray<import('@angular/forms').FormGroup<ControlsOf<T[K][0]>>>
    : T[K] extends Record<any, any>
    ? import('@angular/forms').FormGroup<ControlsOf<T[K]>>
    : import('@angular/forms').FormControl<T[K]>;
    /* eslint-enable @typescript-eslint/indent */
};
