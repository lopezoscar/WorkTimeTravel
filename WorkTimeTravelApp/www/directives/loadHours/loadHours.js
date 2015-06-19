"use strict";
var directives = angular.module('starter.directives', ['starter.directives']);
directives.directive('loadHours',['HoursService',function(HoursService){

    return {
        templateUrl:'/directives/loadHours/loadHours.html',
        restrict:'E',
        scope:{},
        controller:["$scope",function($scope){
            $scope.calc = function(){
                HoursService.calc(this.inicioTSV);
            };
        }]
    }
}]);