var sosSettings = angular.module("sosSettings", ["ngRoute", 'ngAnimate', 'ngSanitize']);
sosSettings.config(['$qProvider','$routeProvider', '$locationProvider', function ($qProvider,$routeProvider, $locationProvider) {
    $qProvider.errorOnUnhandledRejections(false);
    $locationProvider.hashPrefix('');
    $routeProvider
        .when("/edit/event/:id", {
            templateUrl: "/views/create-event.html",
            controller: "eventController"
        })
        .when("/create/yogablog/:id", {
            templateUrl: "/views/create-yoga-blog1.html",
            controller: "yogaBlogAddController"
        })
        .when("/create/santhiblog/:id", {
            templateUrl: "/views/create-santhi-blog.html",
            controller: "santhiBlogAddController"
        })    
        .when("/create/news/:id", {
            templateUrl: "/views/news-add.html",
            controller: "newsAddController"
        })    
        .when("/settings_new", {
            templateUrl: "../views/settings.html",
            controller: "eventController"
        })
        .otherwise({
            templateUrl: "/views/settings.html",
            controller: "settingsController"
        });
}]);
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

sosSettings.controller('yogaBlogAddController', ['$scope', '$http', '$timeout', '$routeParams', function($scope, $http, $timeout, $routeParams) {
    $scope.enableDescription = function(event) {
        $('#blogDescription').summernote({
            height: 150, //set editable area's height
        });
        $('#blogDescription').summernote('code', '');
    }
    $scope.enableDescription();

    if($routeParams.id &&  $routeParams.id.toLowerCase() == 'add'){
        $scope.blog = {};
    $scope.saveBlog = function(blog) {
        if (!$('#blogDescription').summernote('code') || !blog.title || !blog.highlightText || !blog.image || !blog.thumbnailImage) {
            alert('Please fill the form details');
            return;
        }
        blog.date = (new Date()).getTime();
        blog.description = $('#blogDescription').summernote('code');//.replace(/<\/?[^>]+(>|$)/g, "");
        blog.slicedDesc = blog.description.slice(0,270) + "...";
        $http.post("/api/yogablog/save", blog).then(function(response) {
            window.location.href = '/settings';
        });
    };
    }
    else if($routeParams.id &&  $routeParams.id.toLowerCase() != 'add'){
        $scope.editYogaBlog = function(id){
            $scope.editYoga = true;
            $http.get('/api/yoga/getYoga/'+id).then(function(res) {
                $scope.blog = {};
                $scope.blog = res.data;
                $('#blogDescription').summernote('code', res.data.description);
            }); 
        }  
        $scope.updateYogaBlog = function (blog) {        
            blog.description = $('#blogDescription').summernote('code');//.replace(/<\/?[^>]+(>|$)/g, "");        
            blog.slicedDesc = blog.description.slice(0,270) + "...";
            $http.post('/api/update/knowyoga', blog).then(function(res) {                
                window.location.href = '/settings';
            },function(){
                console.log(error)
            });  
        }

        $scope.editYogaBlog($routeParams.id);
    }   
    $scope.editYogaForm  = function(id) {
        var loc = '/settings/#/create/yogablog/' + id;
        window.location.href = loc;
    };
}]);


sosSettings.controller('santhiBlogAddController', ['$scope', '$http', '$timeout', '$routeParams', function($scope, $http, $timeout, $routeParams) {
   
    if($routeParams.id &&  $routeParams.id.toLowerCase() == 'add'){
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
    else if($routeParams.id &&  $routeParams.id.toLowerCase() != 'add'){
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
        $scope.editSanthiBlog($routeParams.id);
    }
    $scope.editSanthiForm  = function(id) {
        var loc = '/settings/#/create/santhiblog/' + id;
        window.location.href = loc;
    };
    
}]);

sosSettings.controller('newsAddController', ['$scope', '$http', '$timeout', '$routeParams', function($scope, $http, $timeout, $routeParams) {

    $scope.enableDescription = function(event) {
        $('#newsDescription').summernote({
            height: 150, //set editable area's height
        });
        $('#newsDescription').summernote('code', '');
    }
    $scope.enableDescription();

    if($routeParams.id &&  $routeParams.id.toLowerCase() == 'add'){
        $scope.isEdit = false;       
    }
    else if($routeParams.id &&  $routeParams.id.toLowerCase() != 'add'){
        $scope.isEdit = true;
        $scope.editNews = function(id) {
            $http.get('/api/news/getnews/' + id).then(function(res) {
                $scope.news = res.data;
                $('#newsDescription').summernote('code', res.data.description);
                console.log(res);
                $scope.isEdit = true;
                $scope.editNewsId = id;
            });
            console.log(id)
        }
        
        $scope.editNews($routeParams.id);
    }
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
            description: $('#newsDescription').summernote('code'),//$scope.news.description,
            slicedDesc: $scope.news.description.slice(0,100) + "..."
            //highlight: $scope.news.highlight
        }
        $http.post('/api/save/news', data).then(function(result) {
            window.location.href = '/settings';
            },function(error){
                console.log(error)
            })
    } 
    $scope.editNewsForm  = function(id) {
        var loc = '/settings/#/create/news/' + id;
        window.location.href = loc;
    };
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
}]);

sosSettings.controller('settingsController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
    $scope.logout = function() {
        $http.get('/api/logout').then(function() {
            location.href = '../#/login';
        })
    }
    $scope.reloadYogaGrid = function() {
        $('#yogaGrid').jsGrid("render");
    }
    $scope.reloadSanthiGrid = function() {
        $('#santhiGrid').jsGrid("render");
    }
    $scope.reloadNewsGrid = function() {
        $('#newsGrid').jsGrid("render");
    }

    $scope.saveGenSettings = function (settings) {
        $scope.successAlert = '';
        $http.post('/api/saveGeneralSettings', settings).then(function(res) {
            $scope.successAlert = res.data;
            angular.element("input[type='file']").val(null);
            $scope.genSettings.knowYogaBannerImg = null;
            $scope.genSettings.santhiBlogBannerImg = null;
        })
    }
}]);

sosSettings.controller('yogaGridController', ['$scope', '$location', function($scope, $location) {
    $scope.editForm = function(id) {
        var loc = '/settings/#/edit/event/' + id;
        window.location.href = loc;
    };

}]);

sosSettings.controller('eventsGridController', ['$scope', '$location','$http', function($scope, $location, $http) {
    $scope.editForm = function(id) {
        var loc = '/settings/#/edit/event/' + id;
        window.location.href = loc;
    };
    $scope.saveEventCopy = function(event) {
        $http.post("/api/edit/event", event).then(function(response) {
            console.log(response);
            $scope.successAlert = response.data;
        });
    }

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
sosSettings.controller('eventController', ['$scope', '$http', '$routeParams', '$filter', function($scope, $http, $routeParams, $filter) {
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
        $('#summernote').summernote('code', $scope.event.description); 
        //$('#summernote').summernote('code').replace(/<\/?[^>]+(>|$)/g, "");
        //$('#summernote').summernote('insertNode', $($scope.event.description)[0]);
    });
    $scope.save = function(eve) {
        eve.startDate = $filter('date')((new Date($('#datetimepicker1 input').val())).getTime(), 'dd/MMM/yyyy');//$('#datetimepicker1').data("DateTimePicker").date().format("DD/MMM/YYYY");
        eve.endDate = $filter('date')((new Date($('#datetimepicker2 input').val())).getTime(), 'dd/MMM/yyyy');//$('#datetimepicker2').data("DateTimePicker").date().format("DD/MMM/YYYY");
        eve.regClosesOn = $filter('date')((new Date($('#datetimepicker3 input').val())).getTime(), 'dd/MMM/yyyy');//$('#datetimepicker3').data("DateTimePicker").date().format("DD/MMM/YYYY");
        //$("#summernote").code().replace(/<\/?[^>]+(>|$)/g, "");
        eve.description = $('#summernote').summernote('code');
        

    };
    
}]);