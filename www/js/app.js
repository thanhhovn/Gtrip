// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic', 'starter.controllers','ngRoute'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
	
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
    
  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    
      
  .state('app.login',{
    url:'/login',
      views: {
        'menuContent': {
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
        }
      }
  })
  
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })
  .state('app.detail',{
    url:'/detail/:id',
      views: {
        'menuContent': {
            templateUrl: 'templates/detail.html',
            controller: 'DetailCtrl'
        }
      }
  })
  .state('app.user', {
    url: '/user',
    views: {
      'menuContent': {
        templateUrl: 'templates/user.html',
        controller: 'PlaylistCtrl'
      }
    }
  })
  .state('app.createNewAccount', {
    url: '/createNewAccount',
    views: {
      'menuContent': {
        templateUrl: 'templates/createNewAccount.html',
        controller: 'createNewAccountCtrl'
      }
    }
  })
  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })
  
  .state('app.FAQ', {
    url: '/faq',
    views: {
      'menuContent': {
        templateUrl: 'templates/faq.html',
        controller: 'FAQCtrl'
      }
    }
  })
  
  .state('app.barcode_scanner', {
    url: '/barcode_scanner',
    views: {
      'menuContent': {
        templateUrl: 'templates/barcode_scanner.html',
        controller: 'Barcode_scannerCtrl'
      }
    }
  })
  
  .state('app.booking',{
    url:'/booking/:id',
      views: {
        'menuContent':{
            templateUrl: 'templates/booking.html',
            controller: 'BookingCtrl'
      }
    }
  })
  
   .state('app.PreviewBooking',{
    url:'/previewBooking',
      views: {
        'menuContent':{
            templateUrl: 'templates/previewBooking.html',
            controller: 'PreviewBookingCtrl'
      }
    }
  })
  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});
