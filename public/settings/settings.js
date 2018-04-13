

sosSettings.controller('eventsGridController', ['$scope', '$location', '$http', function ($scope, $location, $http) {
    $scope.editForm = function (id) {
        var loc = '/settings/#/edit/event/' + id;
        window.location.href = loc;
    };
    $scope.saveEventCopy = function (event) {
        $http.post("/api/edit/event", event).then(function (response) {
            $scope.successAlert = response.data;
        });
    }

}]);
sosSettings.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    var reader = new FileReader();
                    reader.onload = function (event) {
                        modelSetter(scope, event.target.result);
                    };

                    reader.readAsDataURL(element[0].files[0]);
                });
            });
        }
    };
}]);
sosSettings.controller('eventController', ['$scope', '$http', '$routeParams', '$filter', function ($scope, $http, $routeParams, $filter) {
    $(document).ready(function () {
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
        $("#datetimepicker1").on("dp.change", function (e) {
            $('#datetimepicker2').data("DateTimePicker").minDate(e.date);
        });
        $("#datetimepicker1").on("dp.change", function (e) {
            $('#datetimepicker3').data("DateTimePicker").maxDate(e.date);
        });
    });
    $scope.addRow = function () {
        $scope.event.schedule.push({
            starts: "",
            ends: "",
            schedule: ""
        });
    };
    $scope.deleteRow = function (item) {
        $scope.event.schedule = _.reject($scope.event.schedule, function (obj) {
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
    $http.get("/api/event/getEvent/" + $routeParams.id).then(function (response, err) {
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
    $scope.save = function (eve) {
        eve.startDate = $filter('date')((new Date($('#datetimepicker1 input').val())).getTime(), 'dd/MMM/yyyy');//$('#datetimepicker1').data("DateTimePicker").date().format("DD/MMM/YYYY");
        eve.endDate = $filter('date')((new Date($('#datetimepicker2 input').val())).getTime(), 'dd/MMM/yyyy');//$('#datetimepicker2').data("DateTimePicker").date().format("DD/MMM/YYYY");
        eve.regClosesOn = $filter('date')((new Date($('#datetimepicker3 input').val())).getTime(), 'dd/MMM/yyyy');//$('#datetimepicker3').data("DateTimePicker").date().format("DD/MMM/YYYY");
        //$("#summernote").code().replace(/<\/?[^>]+(>|$)/g, "");
        eve.description = $('#summernote').summernote('code');


    };

}]);