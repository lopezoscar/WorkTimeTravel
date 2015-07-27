var directives = angular.module('starter.directives');

directives.directive('hoursDetails',['HoursService',function(HoursService){

    return {
        restrict: 'E'
        ,replace: true
        , templateUrl: 'directives/hoursDetails/hoursDetails.html'
        , scope: {
            hoursData: '='
        },
        controller: ['$scope','$state',"$timeout", function ($scope,$state,$timeout) {
            $scope.calc = function(){
                if(typeof this.inicioTSV == "undefined"){
                    return;
                }
                var results = HoursService.calc(this.inicioTSV);
                $scope.hoursData = {
                    vuelo:this.vuelo
                    ,inicioTSV: results.inicioTSV
                    ,ultimoArrivo: results.ultimoArrivo
                    ,finTSV: results.finTSV
                };
                $scope.feedback();
            };

            $scope.onFeedback = false;
            $scope.bkgColor = '#387ef5';
            $scope.feedback = function(){
                $timeout(function(){
                    $scope.onFeedback = false;
                },500);
                $scope.onFeedback = true;

            };


            $scope.createAlarm = function () {
                if ($scope.hoursData.vuelo) {
                    HoursService.addHours($scope.hoursData);
                    $state.go('list');
                }
            };
        }]
    }
}]);