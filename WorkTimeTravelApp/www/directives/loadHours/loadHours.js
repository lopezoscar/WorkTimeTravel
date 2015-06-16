"use strict";
var directives = angular.module('starter.directives', []);
directives.directive('loadHours',[function(){

    return {
        templateUrl:'/directives/loadHours/loadHours.html',
        restrict:'E',
        scope:{},
        controller:["$scope",function($scope){

            $scope.calc = function(){

            };

            console.log('$scope',$scope);
        }]
    }
}]);