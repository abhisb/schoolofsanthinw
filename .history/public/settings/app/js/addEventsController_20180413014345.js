window.settingsApp.controller('eventController', ['$scope', '$http', '$state', '$stateParams', '$filter', function ($scope, $http, $state, $stateParams, $filter) {
    console.log($stateParams)
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
    if ($stateParams.id) {
        $http.get("/api/event/getEvent/" + $stateParams.id).then(function (response, err) {
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
    }
    $scope.saveEvent = function (eve) {
        eve.startDate = $filter('date')((new Date($('#datetimepicker1 input').val())).getTime(), 'dd/MMM/yyyy');//$('#datetimepicker1').data("DateTimePicker").date().format("DD/MMM/YYYY");
        eve.endDate = $filter('date')((new Date($('#datetimepicker2 input').val())).getTime(), 'dd/MMM/yyyy');//$('#datetimepicker2').data("DateTimePicker").date().format("DD/MMM/YYYY");
        eve.regClosesOn = $filter('date')((new Date($('#datetimepicker3 input').val())).getTime(), 'dd/MMM/yyyy');//$('#datetimepicker3').data("DateTimePicker").date().format("DD/MMM/YYYY");
        //$("#summernote").code().replace(/<\/?[^>]+(>|$)/g, "");
        eve.description = $('#summernote').summernote('code').replace(/<\/?[^>]+(>|$)/g);
        $("#alertModal").on('hide.bs.modal', function () {
                angular.element(".modal-backdrop").remove();
                $state.go("events");
        });
        $http.post("/api/event/save", eve).then(function (response) {
            $scope.responseText = response.data;
            $scope.successAlert = true;
            delete $scope.errorAlert;
            $scope.event = {
                type: "TTC"
            };
            $('#summernote').summernote('reset');
            angular.element("#alertModal").modal();
        }, function(error){
            if(error){
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

}]);