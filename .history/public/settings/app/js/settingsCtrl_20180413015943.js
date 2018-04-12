(function () {
    window.settingsApp.controller('Header_Ctrl', ['$rootScope', '$scope', '$state', '$location','$http', function($rootScope, $scope, $state, $location, $http) {
        var url = window.location.href;
        var urlsplit = url.split("/")
        urlsplit = urlsplit[urlsplit.length-1];
        $rootScope.goToHome= function (state) {
            $state.go(state)
        }
        switch(urlsplit){
            case '#events':
            $state.go('events');
            break;

            case '#news':
            $state.go('news');
            break;

            case '#yoga':
            $state.go('yoga');
            break;

            case '#santhi':
            $state.go('santhi');
            break;

            case '#general':
            $state.go('general');
            break;

            default:
            $state.go('events');
            break;
        }
    }]);    

    window.settingsApp.controller('settingsController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
    $scope.logout = function() {
        $http.get('/api/logout').then(function() {
            location.href = '../#/login';
        })
    }
    $scope.reloadYogaGrid = function() {
        $('#yogaGrid').jsGrid("render");
    }
    $scope.reloadSanthiGrid = function() {
        $('#santhiGrid').jsGrid("render");
    }
    $scope.reloadNewsGrid = function() {
        $('#newsGrid').jsGrid("render");
    }

    $scope.saveGenSettings = function (settings) {
        $scope.successAlert = '';
        $http.post('/api/saveGeneralSettings', settings).then(function(res) {
            $scope.successAlert = res.data;
            angular.element("input[type='file']").val(null);
            $scope.genSettings.knowYogaBannerImg = null;
            $scope.genSettings.santhiBlogBannerImg = null;
        })
    }
}]);
})();