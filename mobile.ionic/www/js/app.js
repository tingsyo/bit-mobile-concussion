/* For local storage */
/*
angular.module('ionic.utils',[])
.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);
*/
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngCordova', 'starter.controllers', 'starter.services', 'nvd3', 'ngCordova'])
// Add constant for CORS
.constant('ApiEndpoint', {
  url: 'http://localhost:8100'
})

.run(function($ionicPlatform, $rootScope, $timeout, $state, $cordovaLocalNotification) {
    // Starter
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
        // Cordova Local Notification
        // Check Permission for iOS8
        if(device.platform === "iOS") {
            window.plugin.notification.local.promptForPermission();
        }
        // Register broadcast
        window.plugin.notification.local.onadd = function (id, state, json) {
            var notification = {
                id: id,
                state: state,
                json: json
            };
            $timeout(function() {
                $rootScope.$broadcast("$cordovaLocalNotification:added", notification);
            });
        };
        // Cordova Local Notification        
    });

})
.config(function($httpProvider, $stateProvider, $urlRouterProvider) {
   
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
    // setup an abstract state for the tabs directive
    .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
    })
    // Each tab has its own nav history stack:
    /* main-screen view*/
    .state('tab.main', {
        url: '/main',
        views: {
          'main-screen': {
            templateUrl: 'templates/u-main-screen.html',
            controller: 'MainCtrl'
          }
        }
    })
    .state('tab.diary', {
        url: '/diary',
        views: {
          'main-screen': {
            templateUrl: 'templates/u-diary.html',
            controller: 'DiaryCtrl'
          }
        }
    })
    .state('tab.staticintervention', {
        url: '/static-intervention',
        views: {
          'main-screen': {
            templateUrl: 'templates/u-static-intervention.html',
            controller: 'StaticInterventionCtrl'
          }
        }
    })
    .state('tab.contact-us', {
        url: '/contact-us',
        views: {
          'main-screen': {
            templateUrl: 'templates/u-contact-us.html',
            controller: 'ContactUsCtrl'
          }
        }
    })  
    /* evaluation view*/
    .state('tab.evaluation', {
        url: '/evaluateoverall',
        views: {
          'evaluation': {
            templateUrl: 'templates/u-evaluate-overall.html',
            controller: 'EvalSympCtrl'
          }
        }
    })
    .state('tab.evaluate', {
        url: '/evaluatesymptoms',
        views: {
          'evaluation': {
            templateUrl: 'templates/u-evaluate-symptoms.html',
            controller: 'EvalSympCtrl'
          }
        }
    })
    /* profile view*/
      .state('tab.profile', {
        url: '/profile',
        views: {
          'profile': {
            templateUrl: 'templates/u-profile.html',
            controller: 'ProfileCtrl'
          }
        }
    })
    .state('tab.login', {
        url: '/login',
        views: {
          'profile': {
            templateUrl: 'templates/u-profile-edit.html',
            controller: 'ProfileCtrl'
          }
        }
    })
    .state('tab.history', {
        url: '/history',
        views: {
          'profile': {
            templateUrl: 'templates/u-profile-history.html',
            controller: 'ProfileCtrl'
          }
        }
    })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/main');
    
    // Solve CORS
    $httpProvider.defaults.useXDomain = true;
    //$httpProvider.defaults.headers.common = 'Content-Type: application/x-www-form-urlencoded';
    delete $httpProvider.defaults.headers.common['X-Requested-With'];    
});
