var sosSettings = angular.module("sosSettings", ["ngRoute", 'ngAnimate', 'ngSanitize']);
sosSettings.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when("/edit/event/:id", {
            templateUrl: "/views/create-event.html",
            controller: "eventController"
        })
        .otherwise({
            templateUrl: "/views/settings.html",
            controller: "settingsController"
        });
});
sosSettings.directive('onErrorSrc', function() {
    return {
        link: function(scope, element, attrs) {
          element.bind('error', function() {
            if (attrs.src != attrs.onErrorSrc) {
              attrs.$set('src', attrs.onErrorSrc);
            }
          });
        }
    }
});
sosSettings.controller('settingsController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
    $scope.news = {};
    $scope.newsDataSet = [];
    $scope.yoga = {};
    $scope.yoga.blogs = [];
    $scope.shanthi = {};
    $scope.shanthi.blogs = [];
    $scope.isEditYogaBlog = false;
/*******************************************/
/*********** LoginLogout start *************/
/*******************************************/ 
    $scope.logout = function() {
        $http.get('/api/logout').then(function() {
            location.href = '../#/login';
        })
    }
/*****************************************/
/*********** LoginLogout End**************/
/*****************************************/ 


/****************************************************/
/*********** News Operations Data Start *************/
/****************************************************/

    $scope.saveNews = function() {

        if (!$scope.news.title || !$scope.news.description) {
            return;
        }

        if ($scope.isEdit) {
            $scope.deleteNews($scope.editNewsId);
            $scope.isEdit = false;
        }
        var data = {
            title: $scope.news.title,
            description: $scope.news.description,
            //highlight: $scope.news.highlight
        }
        $http.post('/api/save/news', data).then(function(result) {
            console.log(result);
            $scope.news.title = '';
            $scope.news.description = '';
            //$scope.news.highlight = '';
            getAllNews();
        }, function(error) {
            console.log(error);
        })
    }
    getAllNews();

    function getAllNews() {
        $scope.newsDataSet = [];
        $http.get('/api/news/getAll').then(function(res) {
            //$scope.newsDataSet = [];
            console.log(res);
            $scope.newsDataSet = res.data;

        });
    }
    $scope.editNews = function(id) {
        $http.get('/api/news/getnews/' + id).then(function(res) {
            $scope.news = res.data;
            getAllNews();
            console.log(res);
            $scope.isEdit = true;
            $scope.editNewsId = id;
            //$scope.newsDataSet = res.data;
        });
        console.log(id)
    }

    $scope.deleteNews = function(id) {
        var data = {
            "id": id
        }
        $http.post('/api/news/delete', data).then(function(res) {
            getAllNews();
            $scope.news.title = '';
            $scope.news.description = '';
            //$scope.news.highlight = '';
        });
        console.log(id)
    }

/**************************************************/
/*********** News Operations Data End *************/
/**************************************************/


/******************************************/
/*********** Yoga Blogs Start *************/
/******************************************/    
    $scope.saveBlog = function(blog) {
        //$("#summernote").code().replace(/<\/?[^>]+(>|$)/g, "")
        if (!$('#blogDescription').summernote('code') || !blog.title || !blog.highlightText || !blog.image) {
            alert('Please fill the form details');
            return;
        }
        blog.date = (new Date()).getTime();
        blog.description = $('#blogDescription').summernote('code').replace(/<\/?[^>]+(>|$)/g, "");
        $http.post("/api/blog/save", blog).then(function(response) {
            if(response.data.status == 200){
                $scope.successAlert = response.data.message;
                $scope.blog = {};
                $('#blogDescription').summernote('code', '');
                angular.element("input[type='file']").val(null);                
                $timeout(function(){
                   $scope.getAllYogaBlogs();
                   $scope.$apply(); 
               });
            }
        });
    };

    $scope.updateBlog = function(blog) {
        //$("#summernote").code().replace(/<\/?[^>]+(>|$)/g, "")
        if (!$('#blogDescription').summernote('code') || !blog.title || !blog.highlightText || !blog.image) {
            alert('Please fill the form details');
            return;
        }
        blog.date = (new Date()).getTime();
        blog.description = $('#blogDescription').summernote('code').replace(/<\/?[^>]+(>|$)/g, "");
        $http.post("/api/update/knowyoga", blog).then(function(response) {
            if(response.data.status == 200){
                $scope.successAlert = response.data;
                $scope.blog = {};
                $('#blogDescription').summernote('code', '');
                angular.element("input[type='file']").val(null);
                $scope.isEditYogaBlog = false;
                $timeout(function(){
                   $scope.getAllYogaBlogs();
                   $scope.$apply(); 
               })
            }   
        });
    };

    $scope.getAllYogaBlogs = function() {
        $http.get('/api/yogaBlog/getAllBlogs').then(function(res) {
            $scope.yoga.blogs = res.data;
        });
    }
    
    $scope.editYogaBlog = function(id){
        $scope.isEditYogaBlog = true;
        $http.get('/api/yoga/getYoga/'+id).then(function(res) {
            $scope.blog = {};
            $scope.blog = res.data;
            $('#blogDescription').summernote('code', res.data.description);
        }); 
    }

    $scope.deleteYogaBlog = function(id) {
        var data = {
            "id": id
        }
        $http.post('/api/blog/delete', data).then(function(res) {
            if(res.data.status = 200) {
                $scope.successAlert = res.data.message;
                $scope.getAllYogaBlogs();
            }
        });
    }    

    $scope.enableDescription = function(event) {
        $('#blogDescription').summernote({
            height: 150, //set editable area's height
        });
        $('#blogDescription').summernote('code', '');
    }

    $scope.getAllYogaBlogs();

/******************************************/
/*********** Yoga Blogs End ***************/
/******************************************/


/********************************************/
/*********** Santhi Blogs start *************/
/********************************************/
    $scope.santhiBlog = {};
    $scope.savesanthiBlog = function(santhiBlog) {
        if (!$('#santhiBlogDescription').summernote('code') || !santhiBlog.title || !santhiBlog.highlightText || !santhiBlog.image) {
            alert('Please fill the form details');
            return;
        }
        santhiBlog.date = (new Date()).getTime();
        $("#santhiBlogDescription").code().replace(/<\/?[^>]+(>|$)/g, "");
        santhiBlog.description = $('#santhiBlogDescription').summernote('code');
        $http.post("/api/santhiblog/save", santhiBlog).then(function(response) {
            $scope.successAlert = response.data;
            $scope.santhiBlog = {};
            $('#santhiBlogDescription').summernote('code', '');
            angular.element("input[type='file']").val(null);

            $timeout(function() {
                $scope.$apply();
            });
        });
    };

    $scope.getAllShanthiBlogs = function() {
        $http.get('api/santhiblog/getAllBlogs').then(function(res) {
            $scope.shanthi.blogs = res.data;
        });
    }
    $scope.getAllShanthiBlogs();

    
    $scope.editSanthiBlog = function(id){
        $http.get('/api/santhi/getSanthi/'+id).then(function(res) {
            $scope.blog = {};
            $scope.blog = res.data;
            $('#santhiBlogDescription').summernote('code', res.data.description);
        });  

    }

    $scope.deleteSanthiBlogs = function(id) {
        var data = {
            "id": id
        }
        $http.post('/api/santhiblog/delete', data).then(function(res) {
            if(res) {
                $scope.getAllShanthiBlogs();
            }
        });
    }

    $scope.enableSanthiBlogDescription = function() {
        $('#santhiBlogDescription').summernote({
            height: 150, //set editable area's height
        });
        $('#santhiBlogDescription').summernote('code', '');
    }

/********************************************/
/*********** Santhi Blogs End ***************/
/********************************************/
}]);

/********************************************/
/*********** Event actions start ************/
/********************************************/

sosSettings.controller('eventsGridController', ['$scope', '$location', function($scope, $location) {
    $scope.editForm = function(id) {
        var loc = '/settings/#/edit/event/' + id;
        window.location.href = loc;
    };

}]);
sosSettings.directive('fileModel', ['$parse', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function() {
                scope.$apply(function() {
                    var reader = new FileReader();
                    reader.onload = function(event) {
                        modelSetter(scope, event.target.result);
                    };

                    reader.readAsDataURL(element[0].files[0]);
                });
            });
        }
    };
}]);
sosSettings.controller('eventController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    $(document).ready(function() {
        $('.selectpicker').selectpicker();
        //$scope.event.type = $scope.event.type;
        $('#summernote').summernote();
        $('#datetimepicker1').datetimepicker({
            format: 'DD-MMM-YYYY'
        });
        $('#datetimepicker2').datetimepicker({
            format: 'DD-MMM-YYYY'
        });
        $('#datetimepicker3').datetimepicker({
            format: 'DD-MMM-YYYY'
        });
        $("#datetimepicker1").on("dp.change", function(e) {
            $('#datetimepicker2').data("DateTimePicker").minDate(e.date);
        });
        $("#datetimepicker1").on("dp.change", function(e) {
            $('#datetimepicker3').data("DateTimePicker").maxDate(e.date);
        });

    });
    $scope.addRow = function() {
        $scope.event.schedule.push({
            starts: "",
            ends: "",
            schedule: ""
        });
    };
    $scope.deleteRow = function(item) {
        $scope.event.schedule = _.reject($scope.event.schedule, function(obj) {
            return obj == item;
        });
    };
    $scope.types = [{
        name: "TTC"
    }, {
        name: "Satsang"
    }, {
        name: "Workshops"
    }, {
        name: "Retreats"
    }];
    $scope.event = {
        type: "TTC",
        schedule: [{
            starts: "",
            ends: "",
            schedule: ""
        }]
    };
    $http.get("/api/event/getEvent/" + $routeParams.id).then(function(response, err) {
        if (err)
            return;
        $scope.types = [{
            name: "TTC"
        }, {
            name: "Satsang"
        }, {
            name: "Workshops"
        }, {
            name: "Retreats"
        }];
        $scope.event = response.data;
        $('.selectpicker').selectpicker('val', $scope.event.type);
        $("#summernote").code().replace(/<\/?[^>]+(>|$)/g, "");
        $('#summernote').summernote('insertNode', $($scope.event.description)[0]);
    });
    $scope.save = function(eve) {
        eve.startDate = $('#datetimepicker1').data("DateTimePicker").date().format("DD/MMM/YYYY");
        eve.endDate = $('#datetimepicker2').data("DateTimePicker").date().format("DD/MMM/YYYY");
        eve.regClosesOn = $('#datetimepicker3').data("DateTimePicker").date().format("DD/MMM/YYYY");
        $("#summernote").code().replace(/<\/?[^>]+(>|$)/g, "");
        eve.description = $('#summernote').summernote('code');

        $http.post("/api/edit/event", eve).then(function(response) {
            $scope.successAlert = response.data;
        });

    };
}]);

/********************************************/
/*********** Event actions END **************/
/********************************************/