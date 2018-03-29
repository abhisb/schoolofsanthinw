(function () {
    var long2know;
    try {
        long2know = angular.module("long2know")
    } catch (err) {
        long2know = null;
    }

    if (!long2know) {
        angular.module('long2know.services', ['ngResource', 'ngAnimate']);
        angular.module('long2know.controllers', []);
        angular.module('long2know.directives', []);
        angular.module('long2know.constants', []);
        angular.module('long2know',
            [
                'long2know.services',
                'long2know.controllers',
                'long2know.directives',
                'long2know.constants'
            ]);
    }

    var tabsCtrl = function ($state, $location, $filter, appStates, navigationService) {
        var
            vm = this,            
            initialize = function () {
                vm.appStates = [
                    { name: 'events', heading: "Events", route: "tabs.events", active: true, isVisible: true, href: $state.href("tabs.events") },
                    { name: 'news', heading: "News", route: "tabs.news", active: false, isVisible: true, href: $state.href("tabs.news") },
                    { name: 'knowyoga', heading: "Know Yoga", route: "tabs.knowyoga", active: false, isVisible: true, href: $state.href("tabs.knoyoga") },
                    { name: 'santhispeaks', heading: "Santhi Speaks", route: "tabs.santhispeaks", active: false, isVisible: true, href: $state.href("tabs.santhispeaks") }
                ];
            };
        vm.tabSelected = function (route) {
            $state.go(route);
        };
        initialize();
    };

    tabsCtrl.$inject = ['$state', '$location', '$filter', 'appStates', 'navigationService'];
    angular
        .module('long2know.controllers')
        .controller('tabsCtrl', tabsCtrl);

  sosSettings = angular.module('sosSettings', [
        'long2know.services',
        'long2know.controllers',
        'ngSanitize',
        'ui.bootstrap',
        'ui.router',
        'ui',
        'summernote'
    ]);
    
    sosSettings.config(['$uibModalProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider',
        function ($uibModalProvider, $locationProvider, $stateProvider, $urlRouterProvider) {
            $uibModalProvider.options = { animation: true, backdrop: 'static', keyboard: false };
            $locationProvider.html5Mode(false);

            $urlRouterProvider
                .when('/', '/events')
                .otherwise("/events");
                
            $stateProvider
                .state('tabs', {
                    abstract: true,
                    url: '/',
                    views: {
                        'tabs': {
                            controller: 'tabsCtrl as tc',
                            templateUrl: 'tabs.html',
                        }
                    }
                })
                .state('tabs.events', {
                    url: 'events',
                    templateUrl: 'views/create-event.html',
                    controller: function ($scope) { 
                        $scope.options = {
                            height: 300,
                            focus: true,
                            airMode: true,
                            toolbar: [
                                    ['edit',['undo','redo']],
                                    ['headline', ['style']],
                                    ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
                                    ['fontface', ['fontname']],
                                    ['textsize', ['fontsize']],
                                    ['fontclr', ['color']],
                                    ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
                                    ['height', ['height']],
                                    ['table', ['table']],
                                    ['insert', ['link','picture','video','hr']],
                                    ['view', ['fullscreen', 'codeview']],
                                    ['help', ['help']]
                                ]
                          };
                          console.log('events') },
                    reloadOnSearch: false
                })
                .state('tabs.news', {
                    url: 'news',
                    templateUrl: 'views/news.html',
                    controller: function () { console.log('news') },
                    reloadOnSearch: false
                })
                .state('tabs.knowyoga', {
                    url: 'knowyoga',
                    templateUrl: 'views/create-blog-yoga.html',
                    controller: function () { console.log('knowyoga') },
                    reloadOnSearch: false
                })
                .state('tabs.santhispeaks', {
                    url: 'santhispeaks',
                    templateUrl: 'views/create-blog-shanthi.html',
                    controller: function () { console.log('santhispeaks') },
                    reloadOnSearch: false
                })
        }]);

    sosSettings.run(['$log', 'navigationService', function ($log, navigationService) {
        // Note, we need a reference to the navigationService so $state events are tracked.
        $log.log("Start.");
    }]);
})()