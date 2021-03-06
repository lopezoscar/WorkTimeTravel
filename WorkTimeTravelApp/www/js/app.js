// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
// From 2.8.1 onward

moment.locale('en');
window.db = null;
angular.module('starter', ['ionic','ngCordova',"firebase","LocalForageModule",'starter.controllers', 'starter.services','starter.directives'])

    .config(['$localForageProvider', function($localForageProvider){
        $localForageProvider.config({
            driver      : 'localStorageWrapper', // if you want to force a driver
            name        : 'WorkTimeFlights', // name of the database and prefix for your data, it is "lf" by default
            version     : 1.0, // version of the database, you shouldn't have to use this
            storeName   : 'hours', // name of the table
            description : 'work hours'
        });
    }])


    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }

            //db = $cordovaSQLite.openDB("flights");
            //$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS flights (id integer primary key AUTOINCREMENT, flight_id text, inicioTSV date,ultimo_arrivo date,finTSV date)");
        });
    })

    .config(function($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            .state('list',{
                url:'/list',
                templateUrl:'templates/list.html',
                controller:'ListCtrl'
            })
            .state('add',{
                url:'/add',
                templateUrl:'templates/addHours.html'
            })

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })

            // Each tab has its own nav history stack:

            .state('tab.dash', {
                url: '/dash',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/tab-dash.html',
                        controller: 'DashCtrl'
                    }
                }
            })

            .state('tab.chats', {
                url: '/chats',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/tab-chats.html',
                        controller: 'ChatsCtrl'
                    }
                }
            })
            .state('tab.chat-detail', {
                url: '/chats/:chatId',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/chat-detail.html',
                        controller: 'ChatDetailCtrl'
                    }
                }
            })

            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/tab-account.html',
                        controller: 'AccountCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/list');

    });
