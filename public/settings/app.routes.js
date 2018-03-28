sosSettings.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when("/edit/event/:id", {
            templateUrl: "/views/create-event.html",
            controller: "eventController"
        })
        .when('/events', {
            template: '<div>Tab1</div>'
        })
        .when('/news', {
            template: '<div>Tab2</div>'
        })
        .when('/knowyoga', {
            template: '<div>Tab1</div>'
        })
        .when('/santhispeaks', {
            template: '<div>Tab2</div>'
        })
        .otherwise({
            templateUrl: "/views/settings.html",
            controller: "settingsController"
        });
});