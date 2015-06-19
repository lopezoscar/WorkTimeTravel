var directives = angular.module('starter.directives');

directives.directive('hoursDetails',[function(){

        return {
            restrict:'E'
            ,templateUrl:'/directives/hoursDetails/hoursDetails.html'
            ,scope:{
                hoursData:'='
            },
            controller:['$scope',function($scope){
                console.log($scope.hoursData);

                $scope.saveHours = function(){

                }
            }]
        }
}]);