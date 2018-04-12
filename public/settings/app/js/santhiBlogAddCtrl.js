(function () {
window.settingsApp.controller('santhiBlogAddController', ['$scope', '$http', '$timeout', '$stateParams', function($scope, $http, $timeout, $stateParams) {
   
    if($stateParams.id &&  $stateParams.id.toLowerCase() == 'add'){
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
                window.location.href = '/settings';
            },function(error){
                console.log(error)
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
    else if($stateParams.id &&  $stateParams.id.toLowerCase() != 'add'){
        $scope.editSanthiBlog = function(id){
            $scope.isEditSanthi = true;
            $http.get('/api/santhi/getSanthi/'+id).then(function(res) {
                $scope.santhiBlog = {};
                $scope.santhiBlog = res.data;
                $('#santhiBlogDescription').summernote('code', res.data.description);
            },function(error){
                console.log(error)
            });  
        }
    
        $scope.updateSanthiBlog = function (blog) {        
            blog.description = $('#santhiBlogDescription').summernote('code');//.replace(/<\/?[^>]+(>|$)/g, "");        
            blog.slicedDesc = blog.description.slice(0,270) + "...";
            $http.post('/api/update/santhiblog', blog).then(function(res) {
                window.location.href = '/settings';
            },function(error){
                console.log(error)
            });  
        }    
        $scope.editSanthiBlog($stateParams.id);
    }
    $scope.editSanthiForm  = function(id) {
        var loc = '/settings/#/create/santhiblog/' + id;
        window.location.href = loc;
    };
    
}]);

})();