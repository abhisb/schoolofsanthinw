(function () {
    window.settingsApp.controller('eventsGridController', ['$rootScope', '$scope', '$state', '$location', '$http', function ($rootScope, $scope, $state, $location, $http) {
        $rootScope.stateName = 'events';
        var MyDateField = function (config) {
            jsGrid.Field.call(this, config);
        };
        $(".gridLloader").show();
        MyDateField.prototype = new jsGrid.Field({

            css: "date-field",            // redefine general property 'css'
            align: "center",              // redefine general property 'align'

            myCustomProperty: "foo",      // custom property

            sorter: function (date1, date2) {
                return new Date(date1) - new Date(date2);
            },

            itemTemplate: function (value) {
                return new Date(value).toDateString();
            },
        });
        jsGrid.fields.date = MyDateField;
        $.ajax({
            type: "GET",
            url: '/api/event/getAll'
        }).then(function (data) {


            $("#jsGrid").jsGrid({
                width: "100%",
                sorting: true,
                paging: true,
                filtering: true,
                autoload: true,
                pageSize: 5,
                editing: false,
                data: data,
                noDataContent: 'No data found',
                loadIndicator: function (config) {                    
                    return {
                        show: function () {
                            $(".gridLloader").show()
                        },
                        hide: function () {
                            $(".gridLloader").hide()
                        }
                    };
                },
                deleteConfirm: function (item) {
                    return "The client \"" + item.name + "\" will be removed. Are you sure?";
                },
                controller: {
                    loadData: function (filter) {
                        return $.grep(data, function (client) {
                            return (!filter.name || client.name.toLowerCase().indexOf(filter.name.toLowerCase()) > -1)
                                && (!filter.type || client.type.toLowerCase().indexOf(filter.type.toLowerCase()) > -1);
                        });
                    },
                    deleteItem: function (item) {
                        // debugger;
                        return $.ajax({
                            type: "DELETE",
                            url: "/api/delete/event",
                            data: { "id": item.id }
                        });
                    }
                },
                fields: [
                    { name: "name", type: "text", title: "Name", width: 150, validate: "required" },
                    { name: "type", type: "text", title: "Type", width: 50 },
                    { name: "startDate", type: "date", title: "Start Date", width: 50 },
                    {
                        type: "control",
                        headerTemplate: function () {
                            var grid = this._grid;
                            var $button = $("<a>").attr("role", "button").attr("title", "Add new Event")
                                .addClass([this.buttonClass, this.modeButtonClass, this.insertModeButtonClass, "btn btn-info"].join(" "));
                            $button.on("click", function () {
                                $state.go('addEditEvents');
                            });
                            return $button;
                        },
                        itemTemplate: function (value, item) {
                            var _that = this;
                            var $result = jsGrid.fields.control.prototype.itemTemplate.apply(this, arguments);
                            var $copyButton = $("<span>").attr("class", "copy-button").attr("title", "Copy")
                                .click(function (e) {
                                    var rowData = angular.copy(item);
                                    rowData.name = rowData.name + " - Copy";
                                    rowData.description = rowData.description.replace(/<\/?[^>]+(>|$)/g);
                                    var id = rowData.id;
                                    var grid = _that._grid;
                                    grid.data.splice(findIndex(grid.data, id), 0, rowData);
                                    delete rowData.id;
                                    $('#EventsForm').scope().saveEventCopy(rowData);
                                    grid.refresh();
                                    e.stopPropagation();
                                });

                            var $editButton = $("<span>").attr("class", "edit-button").attr("title", "Edit")
                                .click(function (e) {
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
            for (var i = 0; i < data.length; i++) {
                if (data[i].id == id) {
                    return i;
                }
            }
            return false;
        }
        $scope.editForm = function (eventId) {
            $state.go('addEditEvents', { id: eventId });
        };
        $scope.saveEventCopy = function (event) {
            $http.post("/api/event/save", event).then(function (response) {
                $scope.successAlert = response.data;
            });
        }


    }]);
})();