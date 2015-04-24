'use strict';

/**
 * @ngdoc overview
 * @name bestInMelbourneApp
 * @description
 * # bestInMelbourneApp
 *
 * Main module of the application.
 */
angular
  .module('bestInMelbourneApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/burgers', {
        templateUrl: 'views/burger.html',
        controller: 'BurgerCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/burgers'
      });
  });