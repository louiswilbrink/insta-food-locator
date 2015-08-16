'use strict';

angular.module('instagramFoodLocator', ['ngRoute', 'app.components.navbar'])
    .config(function ($routeProvider, $locationProvider) {
  
    $routeProvider.when('/', {
        templateUrl: 'pages/home.html'
    })
    $routeProvider.when('/dashboard', {
        templateUrl: 'pages/dashboard.html'
    })
    .otherwise({
      redirectTo: '/'
    });

    // Pretty Urls, removing #.
    $locationProvider.html5Mode(true);
});
