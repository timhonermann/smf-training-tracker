import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { environment } from './environments/environment';
import { getApplicationConfig } from './app/app.config';

fetch(environment.configUrl)
  .then((res) => res.json())
  .then((config) => {
    if (!environment.production) {
      console.info('Running with config', config);
    }

    bootstrapApplication(App, getApplicationConfig(config)).catch((err) =>
      console.error(err),
    );
  });
