(function() {
'use strict';

angular.module('app.components.foodViewer', [])
    .directive('foodViewer', foodViewerDirective);

    function foodViewerDirective () {
        return {
            restrict: 'E',
            templateUrl: 'components/food-viewer/food-viewer.html',
            scope: {},
            controller: FoodViewerCtrl,
            controllerAs: 'vm'
        };
    }

    FoodViewerCtrl.$inject = ['$http'];

    function FoodViewerCtrl ($http) {
        var vm = this;

        vm.name = 'louis';

        $http({
            method: 'GET',
            url: 'http://127.0.0.1:8181/local-eats'
        })
        .then(function (response) {
            console.log('response', response);
        }, function (response) {
            console.log('error', response);
        });
    }
})();
