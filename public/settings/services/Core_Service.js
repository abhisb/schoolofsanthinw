(function (angular) {
    var Core_Service = function ($rootScope, Core_HttpRequest, Base64, $state, $cookieStore, $sessionStorage, $http, $q, $timeout) {
        var service = this;

        service.getAllEvents = function (data) {
            var deferred = $q.defer();
            var user = {};
            user.username = data.username;
            user.password = data.password;
            Core_HttpRequest.post("api/login", user)
                    .then(function (response) {
                        if (response.status == 200) {
                            deferred.resolve(response.data);

                        }
                    }, function (response) {
                        response.data = false;
                        deferred.reject(response.data);
                    });
            return deferred.promise;
        };

        service.login = function (data) {
            var deferred = $q.defer();
            var user = {};
            user.username = data.username;
            user.password = data.password;
            Core_HttpRequest.post("api/login", user)
                    .then(function (response) {
                        if (response.status == 200) {
                            deferred.resolve(response.data);

                        }
                    }, function (response) {
                        response.data = false;
                        deferred.reject(response.data);
                    });
            return deferred.promise;
        };

    };
    Core_Service.$inject = ['$rootScope', 'Core_HttpRequest', 'Base64', '$state', '$cookieStore', '$sessionStorage', '$http', '$q', '$timeout'];
    sosSettings.service('Core_Service', Core_Service);
})(angular);
