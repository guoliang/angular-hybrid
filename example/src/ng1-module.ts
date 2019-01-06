import * as angular from 'angular';
import { Trace, UrlRouterProvider } from "@uirouter/angularjs";

import { Ng2Component } from "./ng2-module";

import { UrlService, StateRegistry, UrlRouter } from '@uirouter/core';

export const app = angular.module('minimal', ['ui.router.upgrade']);

app.run(($stateRegistry: StateRegistry, $urlService: UrlService) => {
  $urlService.rules.initial({ state: 'app' });

  $stateRegistry.register({
    url: '',
    name: 'app',
    template: `
        <a ui-sref=".ng1" ui-sref-active-eq="active">app.ng1</a>
        <a ui-sref=".ng1.ng2" ui-sref-active-eq="active">app.ng1.ng2</a>
        <a ui-sref=".ng2" ui-sref-active-eq="active">app.ng2</a>
        <a ui-sref=".ng2.ng2" ui-sref-active-eq="active">app.ng2.ng2</a>
        <ui-view></ui-view>
      `,
  });

  // route to ng1 component
  //   $stateRegistry.register({
  //     url: '/ng1',
  //     name: 'app.ng1',
  //     component: 'ng1Component',
  //   });

  // nested route to ng2 component
  $stateRegistry.register({
    url: '/ng2',
    name: 'app.ng1.ng2',
    component: Ng2Component,
  });

  // route to ng2 component
  $stateRegistry.register({
    url: '/ng2',
    name: 'app.ng2',
    component: Ng2Component,
  });
});

// An AngularJS component
app.component('ng1Component', {
  template: `
      <h1>ng1 component</h1>
      <a ui-sref="app">Back to app</a>
      <ui-view></ui-view>
    `,
  controller: function () {
    this.$onInit = function () {
      console.log('ng1Component.$onInit()');
    };
  },
});

const traceRunBlock = ['$trace', ($trace: Trace) => { $trace.enable(1); }];
app.run(traceRunBlock);

app.config(['$stateProvider', $stateProvider => {
  console.info("Config states");
  console.info($stateProvider);

  $stateProvider.state({
    url: '/ng1',
    name: 'app.ng1',
    component: 'ng1Component',
  });
}]);

app.config(['$urlRouterProvider', '$locationProvider',
  ($urlRouterProvider: UrlRouterProvider, $locationProvider: ng.ILocationProvider) => {
    $locationProvider.hashPrefix('');
    $urlRouterProvider.otherwise("/ng1");
  }
]);