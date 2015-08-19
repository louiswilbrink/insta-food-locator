(function() {
'use strict';

angular.module('app.components.navbar', [])
    .directive('navbar', navbarDirective);

    function navbarDirective () {
        return {
            restrict: 'E',
            templateUrl: 'components/navbar/navbar.html',
            scope: {},
            controller: NavbarController,
            controllerAs: 'vm'
        };
    }

    NavbarController.$inject = ['$cookies'];

    function NavbarController ($cookies) {
        var vm = this;

        vm.logout = function () {
            console.log('logging out (TODO)');
        };
    };
})();
