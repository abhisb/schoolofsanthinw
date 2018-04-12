(function () {
    window.settingsApp.controller('eventsGridController', ['$scope', '$location','$http', function($scope, $location, $http) {
        var MyDateField = function(config) {
            jsGrid.Field.call(this, config);
        };
         
        MyDateField.prototype = new jsGrid.Field({
         
            css: "date-field",            // redefine general property 'css'
            align: "center",              // redefine general property 'align'
         
            myCustomProperty: "foo",      // custom property
         
            sorter: function(date1, date2) {
                return new Date(date1) - new Date(date2);
            },
         
            itemTemplate: function(value) {
                return new Date(value).toDateString();
            },
        });
         
        jsGrid.fields.date = MyDateField;
         $.ajax({
                    type: "GET",
                    url: '/api/event/getAll'
                }).then(function(data){
        
        
            $("#jsGrid").jsGrid({
                width: "100%",
                sorting: true,
                paging: true,
                filtering :true,
                autoload: false,
                pageSize: 5,
                editing:false,
                data: data,
                deleteConfirm: function(item) {
                    return "The client \"" + item.name + "\" will be removed. Are you sure?";
                },
                controller:{
                    loadData: function(filter) {
                    return $.grep(data, function(client) {
                        return (!filter.name || client.name.toLowerCase().indexOf(filter.name.toLowerCase()) > -1)
                            && (!filter.type || client.type.toLowerCase().indexOf(filter.type.toLowerCase()) > -1) ;
                    });
                },
                deleteItem: function(item) {
                        // debugger;
                return $.ajax({
                    type: "DELETE",
                    url: "/api/delete/event",
                    data:{ "id":item.id}
                });
            }},
                fields: [
                    { name: "name", type: "text",title:"Name", width: 150, validate: "required" },
                    { name: "type", type: "text",title:"Type", width: 50 },
                    { name: "startDate", type: "date",title:"Start Date", width: 50 },
                    { 
                        type: "control",
                        headerTemplate: function() {
                            var grid = this._grid;    
                            var $button = $("<a>").attr("role", "button").attr("href", "/#/create/new-event").attr("title","Add new Event")
                                .addClass([this.buttonClass, this.modeButtonClass, this.insertModeButtonClass, "btn btn-info"].join(" "));
                            return $button;
                        },
                        itemTemplate: function(value, item) {
                            var _that = this;
                            var $result = jsGrid.fields.control.prototype.itemTemplate.apply(this, arguments);
                            var $copyButton = $("<span>").attr("class","copy-button").attr("title","Copy")
                                .click(function(e) {                            
                                    var rowData = angular.copy(item);
                                    rowData.name = rowData.name + " - Copy";                            
                                    var id = rowData.id;
                                    var grid = _that._grid;
                                    grid.data.splice(findIndex(grid.data, id), 0, rowData);
                                    delete rowData.id;
                                    $('#EventsForm').scope().saveEventCopy(rowData);
                                    grid.refresh();
                                    e.stopPropagation();
                                });
        
                            var $editButton = $("<span>").attr("class","edit-button").attr("title","Edit")
                                .click(function(e) {
                                    $('#EventsForm').scope().editForm(item.id);
                                    e.stopPropagation();
                                });
                            
                            return $result.add($copyButton).add($editButton);
                        }
                    }
                ]
            });
         });
         
         function findIndex(data, id) {
            for(var i=0; i < data.length; i++) {
                if(data[i].id == id) {
                    return i;
                }
            }
            return false;
         }
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

    window.settingsApp.controller('eventController', ['$scope', '$http', '$routeParams', '$filter', function($scope, $http, $routeParams, $filter) {
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

}]);
})();