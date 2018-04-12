(function () {
    window.settingsApp.controller('yogaBlogAddController', ['$scope', '$http', '$timeout', '$stateParams', function ($scope, $http, $timeout, $stateParams) {
        $scope.enableDescription = function (event) {
            $('#blogDescription').summernote({
                height: 150, //set editable area's height
            });
            $('#blogDescription').summernote('code', '');
        }
        $scope.enableDescription();

        if ($stateParams.id && $stateParams.id.toLowerCase() == 'add') {
            $scope.blog = {};
            $scope.saveBlog = function (blog) {
                if (!$('#blogDescription').summernote('code') || !blog.title || !blog.highlightText || !blog.image || !blog.thumbnailImage) {
                    alert('Please fill the form details');
                    return;
                }
                blog.date = (new Date()).getTime();
                blog.description = $('#blogDescription').summernote('code');//.replace(/<\/?[^>]+(>|$)/g, "");
                blog.slicedDesc = blog.description.slice(0, 270) + "...";
                $http.post("/api/yogablog/save", blog).then(function (response) {
                    window.location.href = '/settings';
                });
            };
        }
        else if ($stateParams.id && $stateParams.id.toLowerCase() != 'add') {
            $scope.editYogaBlog = function (id) {
                $scope.editYoga = true;
                $http.get('/api/yoga/getYoga/' + id).then(function (res) {
                    $scope.blog = {};
                    $scope.blog = res.data;
                    $('#blogDescription').summernote('code', res.data.description);
                });
            }
            $scope.updateYogaBlog = function (blog) {
                blog.description = $('#blogDescription').summernote('code');//.replace(/<\/?[^>]+(>|$)/g, "");        
                blog.slicedDesc = blog.description.slice(0, 270) + "...";
                $http.post('/api/update/knowyoga', blog).then(function (res) {
                    window.location.href = '/settings';
                }, function () {
                    console.log(error)
                });
            }

            $scope.editYogaBlog($stateParams.id);
        }
        $scope.editYogaForm = function (id) {
            var loc = '/settings/#/create/yogablog/' + id;
            window.location.href = loc;
        };
    }]);
})();