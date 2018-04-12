(function () {
  'use strict';
  var Core_Routes = function ($stateProvider, $locationProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    $urlMatcherFactoryProvider.strictMode(false);
    $stateProvider
      .state('settings', {
        url: '/settings/#events',
        abstract: true
      })
      .state('events', {
        url: '/settings/#events',
        views: {
          'content@': {
            templateUrl: 'views/events1.html',
            controller: 'eventsGridController',
          }
        }
      })
      .state('news', {
        url: '/settings/#news',
        views: {
          'content@': {
            templateUrl: 'views/news.html',
            controller: 'newsCtrl'
          }
        }
      })
      .state('yoga', {
        url: '/settings/#yoga',
        views: {
          'content@': {
            templateUrl: 'views/create-blog-yoga.html',
            controller: 'yogaCtrl'
          }
        }
      })
      .state('addYoga', {
        url: '/settings/#yoga/add',
        views: {
          'content': {
            templateUrl: 'views/create-yoga-blog.html',
            controller: 'yogaBlogAddController'
          }
        }
      })
      .state('santhi', {
        url: '/settings/#santhi',
        views: {
          'content@': {
            templateUrl: 'views/create-blog-shanthi.html',
            controller: 'santhiCtrl'
          }
        }
      })
      .state('general', {
        url: '/settings/#general',
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



// (function () {
//   var Core_Routes = function ($stateProvider, $locationProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
//     $locationProvider.html5Mode({
//       enabled: true,
//       requireBase: false
//     });
//     $locationProvider.hashPrefix('');

//   $stateProvider
//    .state('events', {
//     url: '/settings/#events',
//     views: {
//       'content': {
//         templateUrl: 'views/events1.html',
//         controller: 'eventsGridController',
//       }
//     }  
//   }).state('addEvents', {
//     url: '/settings/#events/add',
//     views: {
//       'content': {
//         templateUrl: 'views/create-event.html',
//         controller: 'eventController',
//       }
//     }  
//   }).state('events.edit', {
//     url: '/settings/#events/edit/:id',
//     views: {
//       'content': {
//         templateUrl: 'views/create-event.html',
//         controller: 'eventController',
//       }
//     }   
//   }).state('news', {
//     url: '/settings/#news',
//     views: {
//       'content': {
//         templateUrl: 'views/news.html',
//         controller: 'newsCtrl'
//       }
//     }       
//   }).state('news.add', {
//     url: '/settings/#news/add',
//     views: {
//       'content': {
//         templateUrl: 'views/news-add.html',
//         controller: 'newsAddCtrl'
//       }
//     }       
//   }).state('news.edit', {
//     url: '/settings/#news/edit/:id',
//     views: {
//       'content': {
//         templateUrl: 'views/news-add.html',
//         controller: 'newsAddCtrl'
//       }
//     }       
//   }).state('yoga', {
//     url: '/settings/#yoga',
//     views: {
//       'content': {
//         templateUrl: 'views/create-blog-yoga.html',
//         controller: 'yogaCtrl'
//       }
//     }       
//   }).state('addYoga', {
//     url: '/settings/#yoga/add',
//     views: {
//       'content': {
//         templateUrl: 'views/create-yoga-blog.html',
//         controller: 'yogaBlogAddController'
//       }
//     }      
//   }).state('yoga.edit', {
//     url: 'yoga/edit/:id',
//     views: {
//       'content': {
//         templateUrl: 'views/create-yoga-blog.html',
//         controller: 'yogaAddCtrl'
//       }
//     }      
//   }).state('santhi', {
//     url: '/settings/#santhi',
//     views: {
//       'content': {
//         templateUrl: 'views/create-blog-shanthi.html',
//         controller: 'santhiCtrl'
//       }
//     }       
//   }).state('santhi.add', {
//     url: '/settings/#santhi/add',
//     views: {
//       'content': {
//         templateUrl: 'views/create-shanthi-blog.html',
//         controller: 'santhiAddCtrl'
//       }
//     }     
//   }).state('santhi.edit', {
//     url: '/settings/#santhi/edit/:id',
//     views: {
//       'content': {
//         templateUrl: 'views/create-shanthi-blog.html',
//         controller: 'santhiAddCtrl'
//       }
//     }        
//   }).state('general', {
//     url: '/settings/#general',
//     views: {
//       'content': {
//         templateUrl: 'views/general-settings.html',
//         controller: 'generalCtrl'
//       }
//     }      
//   })

//   }
//   settingsApp.config(Core_Routes);
// })();

