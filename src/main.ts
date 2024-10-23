import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import localeTr from '@angular/common/locales/tr';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeTr);


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
