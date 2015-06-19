"use strict";
var directives = angular.module('starter.directives', ['starter.services']);
directives.directive('loadHours',['HoursService','$ionicSlideBoxDelegate',function(HoursService,$ionicSlideBoxDelegate){

    return {
        templateUrl:'/directives/loadHours/loadHours.html',
        restrict:'E',
        scope:{
            hoursData:'='
        },
        controller:["$scope",function($scope){
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

                $ionicSlideBoxDelegate.next();
            };
        }]
    }
}]);