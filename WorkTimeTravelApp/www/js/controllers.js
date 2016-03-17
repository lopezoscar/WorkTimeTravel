angular.module('starter.controllers', [])

    .controller('ListCtrl',function($scope,HoursService){
        //this.hours = [];
        $scope.$on('$ionicView.enter', function(e) {
            HoursService.getHours(function(hours){
                $scope.hours = hours;
            });
        });
    })

    .controller('DashCtrl', function($scope,HoursService) {
        $scope.hoursData = {};
        $scope.hours = [];
        $scope.$on('$ionicView.enter', function(e) {
            HoursService.getHours(function(hours){
                $scope.hours = hours;
            });
        });
    })

    .controller('ChatsCtrl',['$scope','HoursService',function($scope, Chats,HoursService) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.hoursData = {};
        $scope.hours = [];
        $scope.$on('$ionicView.enter', function(e) {
            HoursService.getHours(function(hours){
                $scope.hours = hours;
            });
        });
    }])

    .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AccountCtrl', function($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
