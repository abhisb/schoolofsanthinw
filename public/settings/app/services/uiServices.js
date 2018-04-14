(function (angular) {
    var Core_Service = function ($rootScope, Core_HttpRequest, $state, $http, $q, $timeout) {
        var service = this;       
        
        service.saveCopiedEvent = function (data, type) {
            var deferred = $q.defer();
            Core_HttpRequest.post("/api/event/save", data)
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
        
        service.forceExit = function () {
            var deferred = $q.defer();
            var user = {};
            Core_HttpRequest.get("/forceLogout")
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
    Core_Service.$inject = ['$rootScope', 'Core_HttpRequest','$state', '$http', '$q', '$timeout'];
    window.settingsApp.service('Core_Service', Core_Service);
})(angular);
