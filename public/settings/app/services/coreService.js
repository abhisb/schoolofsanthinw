(function(angular) {
    window.settingsApp
            .factory('Core_HttpRequest', function($http) {
                var service = this;           
                service.get = function(path) {
                    return $http.get(path);
                };
                service.post = function(path, jsonData, id) {
                   return $http.post(path, jsonData);
                };

                service.formPost = function(path, jsonData, id) {
                    return $http.post(path, jsonData, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}});
                };
                return service;
            });
})(angular);
