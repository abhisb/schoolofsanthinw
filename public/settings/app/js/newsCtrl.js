(function () {
    window.settingsApp.controller('newsCtrl', ['$rootScope', '$scope', '$state', '$location', '$http', function ($rootScope, $scope, $state, $location, $http) {
        $rootScope.stateName = 'news';
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
            url: '/api/news/getAll'
        }).then(function (data) {
            $("#newsGrid").jsGrid({
                width: "100%",
                sorting: true,
                paging: true,
                filtering: true,
                autoload: true,
                pageSize: 5,
                editing: true,
                data: data,
                deleteConfirm: function (item) {
                    return "The news titled \"" + item.title + "\" will be removed. Are you sure?";
                },
                onItemEditing: function (args) {
                    $('#newsForm').scope().editNewsForm(args.item.id);
                },
                controller: {
                    loadData: function (filter) {
                        return $.grep(data, function (news) {
                            return (!filter.title || news.title.toLowerCase().indexOf(filter.title.toLowerCase()) > -1)
                                && (!filter.slicedDesc || news.slicedDesc.toLowerCase().indexOf(filter.slicedDesc.toLowerCase()) > -1)
                                && (!filter.description || news.description.toLowerCase().indexOf(filter.description.toLowerCase()) > -1);
                        });
                    },
                    deleteItem: function (item) {
                        // debugger;
                        return $.ajax({
                            type: "POST",
                            url: "/api/news/delete",
                            data: { "id": item.id }
                        });
                    }
                },
                fields: [
                    { name: "title", type: "text", title: "Title", width: 50 },
                    { name: "slicedDesc", type: "text", title: "Highlight", width: 70 },
                    { name: "description", type: "text", title: "Description", width: 150 },
                    {
                        type: "control",
                        headerTemplate: function () {
                            var grid = this._grid;
                            var $button = $("<a>").attr("role", "button").attr("title", "Add new Event")
                                .addClass([this.buttonClass, this.modeButtonClass, this.insertModeButtonClass, "btn btn-info"].join(" "));
                            $button.on("click", function () {
                                $state.go('addEditNews');
                            });
                            return $button;
                        }
                    }
                ]
            });
        });
    }]);
})();