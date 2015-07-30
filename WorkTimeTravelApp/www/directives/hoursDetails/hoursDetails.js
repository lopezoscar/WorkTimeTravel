var directives = angular.module('starter.directives');

directives.directive('hoursDetails',['HoursService',function(HoursService){

    return {
        restrict: 'E'
        ,replace: true
        , templateUrl: 'directives/hoursDetails/hoursDetails.html'
        , scope: {
            hoursData: '='
        },
        controller: ['$scope','$state',"$timeout","$ionicModal", function ($scope,$state,$timeout,$ionicModal) {
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
                    $scope.closeModal();
                },1000);
                $scope.openModal();
                $scope.onFeedback = true;
            };

            $ionicModal.fromTemplateUrl('ok-modal.html', {
                scope: $scope,
                animation: 'scale-in-up'
            }).then(function(modal) {
                $scope.modal = modal;
            });

            $scope.openModal = function() {
                $scope.modal.show();
            };
            $scope.closeModal = function() {
                //$scope.modal.hide();
            };
            //Cleanup the modal when we're done with it!
            $scope.$on('$destroy', function() {
                $scope.modal.remove();
            });
            // Execute action on hide modal
            $scope.$on('modal.hidden', function() {
                // Execute action
            });
            // Execute action on remove modal
            $scope.$on('modal.removed', function() {
                // Execute action
            });


            $scope.createAlarm = function () {
                if ($scope.hoursData.vuelo) {
                    HoursService.addHours($scope.hoursData);
                    $state.go('list');
                }
            };
        }]
    }
}]);