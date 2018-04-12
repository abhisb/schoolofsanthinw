(function () {
    'use strict';
    var Core_Run = function ($rootScope, $state, $timeout, $http, $window) {


        $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
            $rootScope.subState = false;
        });

         $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {            
            console.log("stateChangeStart")
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if( toState.name == "addEditYoga" ||
                toState.name == "addEditNews" ||
                toState.name == "addEditEvents" ||
                toState.name == "addEditSanthi") {
                $rootScope.subState = true;
            }
            else{
                $rootScope.subState = false;
            }
            
        });
    };
    window.settingsApp.run(Core_Run);
})();
