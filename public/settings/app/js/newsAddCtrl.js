(function () {
    window.settingsApp.controller('newsAddController', ['$scope', '$http', '$timeout', '$state', '$stateParams', function ($scope, $http, $timeout, $state, $stateParams) {

        $scope.enableDescription = function (event) {
            $('#newsDescription').summernote({
                height: 150, //set editable area's height
            });
            $('#newsDescription').summernote('code', '');
        }
        $scope.enableDescription();

        if (!$stateParams.id) {
            $scope.isEdit = false;
        }
        else {
            $scope.isEdit = true;
            $scope.editNews = function (id) {
                $http.get('/api/news/getnews/' + id).then(function (res) {
                    $scope.news = res.data;
                    $('#newsDescription').summernote('code', res.data.description);
                    console.log(res);
                    $scope.isEdit = true;
                    $scope.editNewsId = id;
                });
                console.log(id)
            }

            $scope.editNews($stateParams.id);
        }
        $scope.saveNews = function () {
            $scope.news.description = $('#newsDescription').summernote('code').replace(/<\/?[^>]+(>|$)/g);
            if (!$scope.news.title || !$scope.news.description) {
                return;
            }

            if ($scope.isEdit) {
                $scope.deleteNews($scope.editNewsId);
                $scope.isEdit = false;
            }
            var data = {
                title: $scope.news.title,
                description: $('#newsDescription').summernote('code'),//$scope.news.description,
                slicedDesc: $scope.news.description.slice(0, 100) + "..."
                //highlight: $scope.news.highlight
            }
            $("#alertModal").on('hide.bs.modal', function () {
                angular.element(".modal-backdrop").remove();
                $state.go('news', {}, {reload: true}); 
            });
            $http.post('/api/save/news', data).then(function (response) {
                $scope.responseText = response.data;
                $scope.successAlert = true;
                delete $scope.errorAlert;
                $('#newsDescription').summernote('reset');
                angular.element("#alertModal").modal();
            }, function (error) {
                if (error) {
                    $scope.responseText = "something went wrong, Event not saved Please try after some time...";
                    $scope.errorAlert = true;
                    delete $scope.successAlert;
                    $('#newsDescription').summernote('reset');
                    angular.element("#alertModal").modal();
                }
            })
        }
        $scope.editNewsForm = function (newsId) {
            $state.go('addEditNews', {id: newsId});
        };
        $scope.deleteNews = function (id) {
            var data = {
                "id": id
            }
            $http.post('/api/news/delete', data).then(function (res) {
                getAllNews();
                $scope.news.title = '';
                $scope.news.description = '';
                //$scope.news.highlight = '';
            });
            console.log(id)
        }
    }]);
})();