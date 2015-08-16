(function() {
'use strict';

angular.module('app.components.navbar', [])
    .directive('navbar', navbarDirective);

    function navbarDirective () {
        return {
            restrict: 'E',
            templateUrl: 'components/navbar/navbar.html'
        };
    }
})();
