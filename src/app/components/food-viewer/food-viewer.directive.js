(function() {
'use strict';

angular.module('app.components.foodViewer', [])
    .directive('foodViewer', foodViewerDirective);

    function foodViewerDirective () {
        return {
            restrict: 'E',
            templateUrl: 'components/food-viewer/food-viewer.html'
        };
    }
})();
