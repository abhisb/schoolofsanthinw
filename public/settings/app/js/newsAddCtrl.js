(function () {
    window.settingsApp.controller('newsAddController', ['$scope', '$http', '$timeout', '$stateParams', function ($scope, $http, $timeout, $stateParams) {

        $scope.enableDescription = function (event) {
            $('#newsDescription').summernote({
                height: 150, //set editable area's height
            });
            $('#newsDescription').summernote('code', '');
        }
        $scope.enableDescription();

        if ($stateParams.id && $stateParams.id.toLowerCase() == 'add') {
            $scope.isEdit = false;
        }
        else if ($stateParams.id && $stateParams.id.toLowerCase() != 'add') {
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
            $http.post('/api/save/news', data).then(function (result) {
                window.location.href = '/settings';
            }, function (error) {
                console.log(error)
            })
        }
        $scope.editNewsForm = function (id) {
            var loc = '/settings/#/create/news/' + id;
            window.location.href = loc;
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