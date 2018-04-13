(function () {
    window.settingsApp.controller('yogaCtrl', ['$rootScope', '$scope', '$state', '$location', '$window', '$http', function ($rootScope, $scope, $state, $location, $window, $http) {
        $rootScope.stateName = 'yoga';
        var MyDateField = function (config) {
            jsGrid.Field.call(this, config);
        };

        $window.onpopstate = function () {
            if ($rootScope.addEditYoga) {
                alert("dasf")
            }
        }

        MyDateField.prototype = new jsGrid.Field({

            css: "date-field", // redefine general property 'css'
            align: "center", // redefine general property 'align'

            myCustomProperty: "foo", // custom property

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
            url: '/api/yogaBlog/getAllBlogs'
        }).then(function (data) {
            $("#yogaGrid").jsGrid({
                width: "100%",
                sorting: true,
                paging: true,
                filtering: true,
                pageSize: 5,
                editing: true,
                data: data,
                autoload: true,
                noDataContent: 'No data found',
                deleteConfirm: function (item) {
                    return "The Yoga Blog titled \"" + item.title + "\" will be removed. Are you sure?";
                },
                onItemEditing: function (args) {
                    $('#yogaForm').scope().editYogaForm(args.item.id);
                },
                controller: {
                    loadData: function (filter) {
                        return $.grep(data, function (yogaBlog) {
                            return (!filter.title || yogaBlog.title.toLowerCase().indexOf(filter.title.toLowerCase()) > -1) &&
                                (!filter.slicedDesc || yogaBlog.slicedDesc.toLowerCase().indexOf(filter.slicedDesc.toLowerCase()) > -1);
                        });
                    },
                    deleteItem: function (item) {
                        // debugger;
                        return $.ajax({
                            type: "DELETE",
                            url: "/api/blog/delete",
                            data: { "id": item.id }
                        });
                    }
                },
                fields: [{
                    name: "name",
                    itemTemplate: function (val, item) {
                        return $("<img>").attr("src", item.thumbnailImage || item.thumbnailSrc).css({ height: 100, width: 200 }).on("click", function () {
                            $("#imagePreview").attr("src", item.thumbnailImage || item.thumbnailSrc);
                            $("#dialog").dialog("open");
                        });
                    },
                    align: "center",
                    width: 120,
                    type: "text",
                    title: "Image",
                    width: 46,
                    validate: "required"
                },
                { name: "title", type: "text", title: "Title", width: 50 },
                { name: "slicedDesc", type: "text", title: "Highlight", width: 150 },
                {
                    type: "control",
                    headerTemplate: function () {
                        var grid = this._grid;
                        var $button = $("<a>").attr("role", "button").attr("id", "add-yoga").attr("title", "Add new Event")
                            .addClass([this.buttonClass, this.modeButtonClass, this.insertModeButtonClass, "btn btn-info"].join(" "));
                        $button.on("click", function () {
                            $state.go('addEditYoga');
                        });
                        return $button;
                    }
                }
                ]
            });
        });

    }]);
})();









