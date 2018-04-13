(function () {
  'use strict';
  var Core_Routes = function ($stateProvider, $locationProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
    $urlRouterProvider.otherwise("events");
    $stateProvider
      .state('settings', {
        url: '',
        abstract: true,
        templateUrl: 'settings.html'
      })
      .state('events', {
        url: '/events',
        views: {
          'content@': {
            templateUrl: 'views/events1.html',
            controller: 'eventsGridController',
          }
        }
      })
      .state('addEditEvents', {
        url: '/settings/addEditEvents/:id',
        views: {
          'content': {
            templateUrl: 'views/create-event.html',
            controller: 'eventController',
          }
        }
      })
      .state('news', {
        url: '/news',
        views: {
          'content@': {
            templateUrl: 'views/news.html',
            controller: 'newsCtrl'
          }
        }
      }).state('addEditNews', {
            url: '/settings/addEditNews/:id',
            views: {
              'content': {
                templateUrl: 'views/news-add.html',
                controller: 'newsAddController'
              }
            }       
          })
      .state('yoga', {
        url: '/yoga',
        views: {
          'content@': {
            templateUrl: 'views/create-blog-yoga.html',
            controller: 'yogaCtrl'
          }
        }
      })
      .state('addEditYoga', {
        url: '/settings/addEditYoga/:id',
        views: {
          'content': {
            templateUrl: 'views/create-yoga-blog.html',
            controller: 'yogaBlogAddController'
          }
        }
      })
      .state('santhi', {
        url: '/santhi',
        views: {
          'content@': {
            templateUrl: 'views/create-blog-shanthi.html',
            controller: 'santhiCtrl'
          }
        }
      }).state('addEditSanthi', {
            url: '/addEditSanthi/:id',
            views: {
              'content': {
                templateUrl: 'views/create-santhi-blog.html',
                controller: 'santhiBlogAddController'
              }
            }     
          })
      .state('general', {
        url: '/general',
        views: {
          'content@': {
            templateUrl: 'views/general-settings.html',
            controller: 'generalCtrl'
          }
        }
      })
  }

  window.settingsApp.config(Core_Routes);
})();

