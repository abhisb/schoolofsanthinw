sosSettings.config (['$urlRouterProvider', '$stateProvider',  function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise ('/settings');

    $stateProvider.
        state ('settings', {
        url: '/settings',
        templateUrl: 'settings.html',
      }).
        state ('about', {
        url: '/about',
        templateUrl: 'about.html',
        controller: 'aboutCtrl'
      }).
        state ('contact', {
        url: '/contact',
        templateUrl: 'contact.html',
        controller: 'contactoneCtrl'
      })
        // Sub page
        .state('contact.one',{
        url: '/contact.contactone',
        templateUrl: 'one.html',
        controller: 'contactoneCtrl'
      })
        // Sub page
        .state('contact.two',{
        url: '/contact.contacttwo',
        templateUrl: 'two.html',
        controller: 'contacttwoCtrl'
      });

  }]);