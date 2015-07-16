var directives = angular.module('starter.directives');

directives.directive('hoursDetails',['$localForage','HoursService',function($localForage,HoursService){

    return {
        restrict: 'E'
        ,replace: true
        , templateUrl: 'directives/hoursDetails/hoursDetails.html'
        , scope: {
            hoursData: '='
        },
        controller: ['$scope', function ($scope) {
            console.log($scope.hoursData);

            $scope.createAlarm = function () {
                var data = {
                    inicioTSV: $scope.hoursData.inicioTSV
                    , ultimoArrivo: $scope.hoursData.ultimoArrivo
                    , finTSV: $scope.hoursData.finTSV
                };
                if ($scope.hoursData.vuelo) {
                    //$localForage.setItem($scope.hoursData.vuelo, data);
                    HoursService.addHours($scope.hoursData);
                    //$localForage.setItem($scope.hoursData.vuelo, data);
                }
            }
        }]
    }
}]);