import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


fetch('assets/appsettings.json')
    .then((response) => response.json())
    .then((json) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.AppConfig = json.AppConfig;
        import('./app/app.module').then(module => {
            platformBrowserDynamic().bootstrapModule(module.AppModule)
                .catch(err => console.log(err));
        });
    });

