(function () {
    window.settingsApp.controller('yogaBlogAddController', ['$rootScope', '$scope', '$http', '$timeout', '$stateParams', '$window', '$state', function ($rootScope, $scope, $http, $timeout, $stateParams, $window, $state) {

        $scope.enableDescription = function (event) {
            $('#blogDescription').summernote({
                height: 150, //set editable area's height
            });
            $('#blogDescription').summernote('code', '');
        }
        $scope.enableDescription();
        $("#alertModal").on('hide.bs.modal', function () {
            angular.element(".modal-backdrop").remove();
            $state.go("yoga");
        });
        if (!$stateParams.id) {
            $scope.blog = {};
            $scope.saveBlog = function (blog) {
                if (!$('#blogDescription').summernote('code') || !blog.title || !blog.tags || !blog.image || !blog.thumbnailImage) {
                    alert('Please fill the form details');
                    return;
                }
                blog.date = (new Date()).getTime();
                blog.description = $('#blogDescription').summernote('code');//.replace(/<\/?[^>]+(>|$)/g, "");
                blog.slicedDesc = blog.description.slice(0, 270) + "...";
                blog.tags = $rootScope.processTags(blog.tags);
                $http.post("/api/yogablog/save", blog).then(function (response) {
                    $scope.responseText = response.data;
                    $scope.successAlert = true;
                    delete $scope.errorAlert;
                    $scope.blog = {};
                    $('#blogDescription').summernote('reset');
                    angular.element("#alertModal").modal();
                }, function (error) {
                    if (error) {
                        $scope.responseText = "something went wrong, Yoga Blog is not saved Please try after some time...";
                        $scope.errorAlert = true;
                        delete $scope.successAlert;
                        $scope.blog = {};
                        $('#blogDescription').summernote('reset');
                        angular.element("#alertModal").modal();
                    }
                });
            };
        }
        else {
            $scope.editYogaBlog = function (id) {
                $scope.editYoga = true;
                $http.get('/api/yoga/getYoga/' + id).then(function (res) {
                    $scope.blog = {};
                    $scope.blog = res.data;
                    $('#blogDescription').summernote('code', res.data.description);
                }, function (error) {
                    if (error) {
                        $scope.responseText = "Server error, Can't fetch data now, Please try after some time";
                        $scope.errorAlert = true;
                        delete $scope.successAlert;
                        angular.element("#alertModal").modal();
                    }
                });
            }
            $scope.updateYogaBlog = function (blog) {
                blog.description = $('#blogDescription').summernote('code');//.replace(/<\/?[^>]+(>|$)/g, "");        
                blog.slicedDesc = blog.description.slice(0, 270) + "...";
                blog.tags = $rootScope.processTags(blog.tags);
                $http.post('/api/update/knowyoga', blog).then(function (response) {
                    $scope.responseText = response.data;
                    $scope.successAlert = true;
                    delete $scope.errorAlert;
                    $scope.blog = {};
                    $('#blogDescription').summernote('reset');
                    angular.element("#alertModal").modal();
                }, function (error) {
                    $scope.responseText = "Server error, Can't update now, Please try after some time...";
                    $scope.errorAlert = true;
                    delete $scope.successAlert;
                    $scope.blog = {};
                    $('#blogDescription').summernote('reset');
                    angular.element("#alertModal").modal();
                });
            }

            $scope.editYogaBlog($stateParams.id);
        }
        $scope.editYogaForm = function (yogaId) {
            $state.go('addEditYoga', { id: yogaId });
        };        
    }]);
})();