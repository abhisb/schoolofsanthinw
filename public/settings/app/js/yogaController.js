(function () {
    window.settingsApp.controller('yogaGridController', ['$scope', '$location','$http', function($scope, $location, $http) {
      
        $scope.editForm = function(id) {
            var loc = '/settings/#/edit/event/' + id;
            window.location.href = loc;
        };

        
}]);
})();