(function () {
    window.settingsApp.controller('yogaBlogAddController', ['$rootScope', '$scope', '$http', '$timeout', '$stateParams', '$window', '$state', function ($rootScope, $scope, $http, $timeout, $stateParams, $window, $state) {

        $scope.enableDescription = function (event) {
            $('#blogDescription').summernote({
                height: 150, //set editable area's height
            });
            $('#blogDescription').summernote('code', '');
        }
        $scope.enableDescription();

        if (!$stateParams.id) {
            $scope.blog = {};
            $scope.saveBlog = function (blog) {
                if (!$('#blogDescription').summernote('code') || !blog.title || !blog.highlightText || !blog.image || !blog.thumbnailImage) {
                    alert('Please fill the form details');
                    return;
                }                
                blog.date = (new Date()).getTime();
                blog.description = $('#blogDescription').summernote('code');//.replace(/<\/?[^>]+(>|$)/g, "");
                blog.slicedDesc = blog.description.slice(0, 270) + "...";
                $("#alertModal").on('hide.bs.modal', function () {
                    angular.element(".modal-backdrop").remove();
                    $state.go("yoga", {}, {reload: true});
                });
                $http.post("/api/yogablog/save", blog).then(function (response) {
                    $scope.responseText = response.data;
                    $scope.successAlert = true;
                    delete $scope.errorAlert;
                    $scope.blog = {};
                    $('#summernote').summernote('reset');
                    angular.element("#alertModal").modal();
                }, function (error) {
                    if (error) {
                        $scope.responseText = "something went wrong, Event not saved Please try after some time...";
                        $scope.errorAlert = true;
                        delete $scope.successAlert;
                        $scope.event = {
                            type: "TTC"
                        };
                        $('#summernote').summernote('reset');
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
                    window.location.href = '/settings';
                });
            }
            $scope.updateYogaBlog = function (blog) {
                blog.description = $('#blogDescription').summernote('code');//.replace(/<\/?[^>]+(>|$)/g, "");        
                blog.slicedDesc = blog.description.slice(0, 270) + "...";
                $http.post('/api/update/knowyoga', blog).then(function (res) {
                    window.location.href = '/settings';
                }, function (error) {
                    console.log(error)
                });
            }

            $scope.editYogaBlog($stateParams.id);
        }
        $scope.editYogaForm = function (yogaId) {
            $state.go('addEditYoga', { id: yogaId });
        };
    }]);
})();