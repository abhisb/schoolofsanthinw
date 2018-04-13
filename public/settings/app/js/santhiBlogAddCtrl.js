(function () {
window.settingsApp.controller('santhiBlogAddController', ['$scope', '$state', '$http', '$timeout', '$stateParams', function($scope, $state, $http, $timeout, $stateParams) {
    $("#alertModal").on('hide.bs.modal', function () {
        angular.element(".modal-backdrop").remove();
        $state.go("santhi");
    });
    if(!$stateParams.id){
        $scope.santhiBlog = {};
        $scope.savesanthiBlog = function(santhiBlog) {
            if (!$('#santhiBlogDescription').summernote('code') || !santhiBlog.title || !santhiBlog.highlightText || !santhiBlog.image || !santhiBlog.thumbnailImage) {
                alert('Please fill the form details');
                return;
            }
            santhiBlog.date = (new Date()).getTime();        
            $('#santhiBlogDescription').summernote('code').replace(/<\/?[^>]+(>|$)/g, "");
            santhiBlog.description = $('#santhiBlogDescription').summernote('code');
            santhiBlog.slicedDesc = santhiBlog.description.slice(0,270) + "...";
            santhiBlog.thumbnailSrc = santhiBlog.image;
            $http.post("/api/santhiblog/save", santhiBlog).then(function(response) {
                    $scope.responseText = response.data;
                    $scope.successAlert = true;
                    delete $scope.errorAlert;
                    $scope.santhiBlog = {};
                    $('#santhiBlogDescription').summernote('reset');
                    angular.element("#alertModal").modal();
            },function(error){
                if (error) {
                    $scope.responseText = "something went wrong, santhi blog is not saved Please try after some time...";
                    $scope.errorAlert = true;
                    delete $scope.successAlert;
                    $scope.santhiBlog = {};
                    $('#santhiBlogDescription').summernote('reset');
                    angular.element("#alertModal").modal();
                }
            });
        };
    
        $scope.enableSanthiBlogDescription = function() {
            $('#santhiBlogDescription').summernote({
                height: 150, //set editable area's height
            });
            $('#santhiBlogDescription').summernote('code', '');
        }
        $scope.enableSanthiBlogDescription();
    }
    else {
        $scope.editSanthiBlog = function(id){
            $scope.isEditSanthi = true;
            $http.get('/api/santhi/getSanthi/'+id).then(function(res) {
                $scope.santhiBlog = {};
                $scope.santhiBlog = res.data;
                $('#santhiBlogDescription').summernote('code', res.data.description);
            },function(error){
                $scope.responseText = "something went wrong, Can't fetch data Please try after some time...";
                    $scope.errorAlert = true;
                    delete $scope.successAlert;
                    angular.element("#alertModal").modal();
            });  
        }
    
        $scope.updateSanthiBlog = function (blog) {        
            blog.description = $('#santhiBlogDescription').summernote('code');//.replace(/<\/?[^>]+(>|$)/g, "");        
            blog.slicedDesc = blog.description.slice(0,270) + "...";
            $http.post('/api/update/santhiblog', blog).then(function(response) {
                $scope.responseText = response.data;
                    $scope.successAlert = true;
                    delete $scope.errorAlert;
                    $scope.santhiBlog = {};
                    $('#santhiBlogDescription').summernote('reset');
                    angular.element("#alertModal").modal();
            },function(error){
                if (error) {
                    $scope.responseText = "something went wrong, santhi blog is not saved Please try after some time...";
                    $scope.errorAlert = true;
                    delete $scope.successAlert;
                    $scope.santhiBlog = {};
                    $('#santhiBlogDescription').summernote('reset');
                    angular.element("#alertModal").modal();
                }
            });  
        }    
        $scope.editSanthiBlog($stateParams.id);
    }
    $scope.editSanthiForm  = function(santhiId) {
        $state.go('addEditSanthi', {id: santhiId});
    };
    
}]);

})();