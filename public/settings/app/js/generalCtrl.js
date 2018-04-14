(function () {
    window.settingsApp.controller('generalCtrl', ['$rootScope', '$scope', '$state', '$location', '$http', function ($rootScope, $scope, $state, $location, $http) {      
        $rootScope.stateName = 'general';
        $("#gridLloader").show();
        $scope.genSettings = {};
        $("#alertModal").on('hide.bs.modal', function () {
            angular.element(".modal-backdrop").remove();
            window.location.reload();
            $(".gridLloader").hide();
        });
        $scope.saveGenSettings = function (settings) {
            $("#gridLloader").show();
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
                $(".gridLloader").hide();
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
                    $(".gridLloader").hide();
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
                    $(".gridLloader").hide();
                    $scope.yogaBanner = null;
                    $scope.shanthiBanner = null;
                    $scope.yogaBannerSrc = null;
                    $scope.shanthiBannerSrc = null;
                });
        }
        $scope.getSavedImages();
    }]);
})();