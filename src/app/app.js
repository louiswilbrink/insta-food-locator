'use strict';

angular.module('instagramFoodLocator', ['ngRoute', 'app.components.navbar', 'app.components.foodViewer'])
    .config(function ($routeProvider, $locationProvider) {
  
    $routeProvider.when('/', {
        templateUrl: 'pages/home.html'
    })
    .otherwise({
      redirectTo: '/'
    });

    // Pretty Urls, removing #.
    $locationProvider.html5Mode(true);
});
