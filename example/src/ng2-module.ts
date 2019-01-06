import { app } from "./ng1-module"

import { Component, NgModule } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';
import { BrowserModule } from '@angular/platform-browser';
import { UIRouterUpgradeModule, NgHybridStateDeclaration } from '@uirouter/angular-hybrid';

// An Angular component
@Component({
    selector: 'ng2-component',
    template: `
        <h1>ng2 component</h1>
        <a uiSref="app">Back to app</a>
        <ui-view></ui-view>
      `,
  })
  export class Ng2Component {
    ngOnInit() {
      console.log('Ng2Component.ngOnInit()');
    }
  }

  const nestedState: NgHybridStateDeclaration = {
    url: '/ng2',
    name: 'app.ng2.ng2',
    component: Ng2Component,
  };

  // The root Angular module
  @NgModule({
    imports: [
      BrowserModule,
      // Provide Angular upgrade capabilities
      UpgradeModule,
      // Provides the @uirouter/angular directives
      UIRouterUpgradeModule.forRoot({ states: [nestedState] }),
    ],
    declarations: [Ng2Component],
    entryComponents: [Ng2Component],
  })
  export class RootModule {
    constructor(private upgrade: UpgradeModule) {}
    ngDoBootstrap() {
      // The DOM must be already be available
      this.upgrade.bootstrap(document.body, [app.name]);
    }
  }