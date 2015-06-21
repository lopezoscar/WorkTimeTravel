"use strict";
var directives = angular.module('starter.directives', ['starter.services']);

directives.directive('capitalize', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            var capitalize = function(inputValue) {
                if(inputValue == undefined) inputValue = '';
                var capitalized = inputValue.toUpperCase();
                if(capitalized !== inputValue) {
                    modelCtrl.$setViewValue(capitalized);
                    modelCtrl.$render();
                }
                return capitalized;
            }
            modelCtrl.$parsers.push(capitalize);
            capitalize(scope[attrs.ngModel]);  // capitalize initial value
        }
    };
});

directives.directive('loadHours',['HoursService','$ionicSlideBoxDelegate',function(HoursService,$ionicSlideBoxDelegate){

    return {
        templateUrl:'directives/loadHours/loadHours.html',
        restrict:'E',
        replace: true,
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