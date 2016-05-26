'use strict';

/**
 * @ngdoc overview
 * @name movementSimulatorApp
 * @description
 * # movementSimulatorApp
 *
 * Main module of the application.
 */
angular
  .module('movementSimulatorApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngclipboard',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl as vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
