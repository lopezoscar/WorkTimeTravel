var directives = angular.module('starter.directives');

directives.directive('listHours',['HoursService',function(HoursService){

    return {
         restrict:'E'
        ,replace: true
        ,templateUrl:'directives/listHours/listHours.html'
        ,scope:{
            hours:'='
        }
        ,controller:["$scope",function($scope){
            $scope.removeHour = function(anHour){
                console.log('removing hour',anHour);
                HoursService.remove(anHour);
                $scope.hours.splice($scope.hours.indexOf(anHour),1);
            }
        }]
    }
}]);