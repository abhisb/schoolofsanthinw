(function () {
    window.settingsApp.controller('generalCtrl', ['$scope', '$state', '$location', '$http', function ($scope, $state, $location, $http) {      
        $scope.saveGenSettings = function (settings) {
            $scope.successAlert = '';
            $http.post('/api/saveGeneralSettings', settings).then(function (res) {
                angular.element("input[type='file']").val(null);
                $scope.genSettings.knowYogaBannerImg = null;
                $scope.genSettings.santhiBlogBannerImg = null;
                $scope.responseText = res.data;
                $scope.successAlert = true;
                delete $scope.errorAlert;
                $scope.getSavedImages();
                angular.element("#alertModal").modal();
            }, function (error) {
                if (error) {
                    $scope.responseText = "Something went wrong, Can't save general settings";
                    $scope.errorAlert = true;
                    delete $scope.successAlert;
                    angular.element("input[type='file']").val(null);
                    $scope.genSettings.knowYogaBannerImg = null;
                    $scope.genSettings.santhiBlogBannerImg = null;
                    angular.element("#alertModal").modal();
                }
            })
        }
        $scope.getSavedImages = function () {
            $http.get("/api/getGeneralSettings")
                .then(function (response, error) {
                    if (response) {
                        $scope.yogaBanner = response.data.knowYogaBannerImg;
                        $scope.shanthiBanner = response.data.santhiBlogBannerImg;
                        $scope.yogaBannerSrc = response.data.knowYogaBannerImgSrc;
                        $scope.shanthiBannerSrc = response.data.santhiBlogBannerImgSrc;
                    }
                    else {
                        $scope.yogaBanner = null;
                        $scope.shanthiBanner = null;
                        $scope.yogaBannerSrc = null;
                        $scope.shanthiBannerSrc = null;
                    }

                }, function (error) {
                    $scope.yogaBanner = null;
                    $scope.shanthiBanner = null;
                    $scope.yogaBannerSrc = null;
                    $scope.shanthiBannerSrc = null;
                });
        }
        $scope.getSavedImages();
    }]);
})();