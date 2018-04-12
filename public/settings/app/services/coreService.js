(function(angular) {
    window.settingsApp
            .factory('Core_HttpRequest', function($http, urlConfig) {
                var service = this;                
                var getUrl = function(path) {
                	return urlConfig.root_path + path;
                };
                service.getUrl = function(path) {
                	return urlConfig.root_path + path;
                };
                service.get = function(path) {
                    return $http.get(getUrl(path));
                };
                service.post = function(path, jsonData, id) {
                   return $http.post(getUrl(path), jsonData);
                };

                service.formPost = function(path, jsonData, id) {
                    return $http.post(getUrl(path), jsonData, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}});
                };
                return service;
            });
})(angular);
