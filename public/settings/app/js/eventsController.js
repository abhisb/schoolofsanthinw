(function () {
    window.settingsApp.controller('eventsGridController', ['$rootScope', '$scope', '$state', '$location', '$http', function ($rootScope, $scope, $state, $location, $http) {
        $rootScope.stateName = 'events';
        var MyDateField = function (config) {
            jsGrid.Field.call(this, config);
        };

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
                    var opts = {
                        lines: 13, // The number of lines to draw
                        length: 7, // The length of each line
                        width: 4, // The line thickness
                        radius: 10, // The radius of the inner circle
                        corners: 1, // Corner roundness (0..1)
                        rotate: 0, // The rotation offset
                        color: '#000', // #rgb or #rrggbb
                        speed: 1, // Rounds per second
                        trail: 60, // Afterglow percentage
                        shadow: false, // Whether to render a shadow
                        hwaccel: false, // Whether to use hardware acceleration
                        className: 'spinner', // The CSS class to assign to the spinner
                        zIndex: 2e9, // The z-index (defaults to 2000000000)
                        top: 'auto', // Top position relative to parent in px
                        left: 'auto' // Left position relative to parent in px
                      };
                    var container = document.getElementById('jsGrid');
                    var spinner = new Spinner(opts);
                    return {
                        show: function () {
                            $('#jsGrid').after(spinner.spin().el);
                        },
                        hide: function () {
                            spinner.stop();
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
            $http.post("/api/edit/event", event).then(function (response) {
                $scope.successAlert = response.data;
            });
        }


    }]);
})();