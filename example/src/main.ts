import { app } from "./ng1-module"
import { RootModule } from "./ng2-module"

import { NgZone } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UrlService } from '@uirouter/core';

// Using AngularJS config block, call `deferIntercept()`.
// This tells UI-Router to delay the initial URL sync (until all bootstrapping is complete)
app.config(['$urlServiceProvider', ($urlService: UrlService) => $urlService.deferIntercept()]);

// Manually bootstrap the Angular app
platformBrowserDynamic()
  .bootstrapModule(RootModule)
  .then(platformRef => {
    // get() UrlService from DI (this call will create all the UIRouter services)
    const url: UrlService = platformRef.injector.get(UrlService);

    // Instruct UIRouter to listen to URL changes
    function startUIRouter() {
      url.listen();
      url.sync();
    }

    const ngZone: NgZone = platformRef.injector.get(NgZone);
    ngZone.run(startUIRouter);
  });
