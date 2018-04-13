(function () {
    window.settingsApp.controller('santhiCtrl', ['$rootScope', '$scope', '$state', '$location', '$http', function ($rootScope, $scope, $state, $location, $http) {
        $rootScope.stateName = 'santhi';
        var MyDateField = function (config) {
            jsGrid.Field.call(this, config);
        };

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
            url: '/api/santhiblog/getAllBlogs'
        }).then(function (data) {
            $("#santhiGrid").jsGrid({
                width: "100%",
                sorting: true,
                paging: true,
                filtering: true,
                autoload: true,
                pageSize: 5,
                editing: true,
                data: data,
                noDataContent: 'No data found',
                deleteConfirm: function (item) {
                    return "The Santhi Blog titled \"" + item.title + "\" will be removed. Are you sure?";
                },
                onItemEditing: function (args) {
                    $('#santhiForm').scope().editSanthiForm(args.item.id);
                },
                controller: {
                    loadData: function (filter) {
                        return $.grep(data, function (santhiBlog) {
                            return (!filter.title || santhiBlog.title.toLowerCase().indexOf(filter.title.toLowerCase()) > -1) &&
                                (!filter.slicedDesc || santhiBlog.slicedDesc.toLowerCase().indexOf(filter.slicedDesc.toLowerCase()) > -1);
                        });
                    },
                    deleteItem: function (item) {
                        // debugger;
                        return $.ajax({
                            type: "DELETE",
                            url: "/api/santhiblog/delete",
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
                    // editTemplate: function() {
                    //     var insertControl = this.insertControl = $("<input>").prop("type", "file");
                    //     return insertControl;
                    // },
                    // editValue: function() {
                    //     return this.insertControl[0].files[0]; 
                    // },
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
                        var $button = $("<a>").attr("role", "button").attr("title", "Add new Event")
                            .addClass([this.buttonClass, this.modeButtonClass, this.insertModeButtonClass, "btn btn-info"].join(" "));
                        $button.on("click", function () {
                            $state.go('addEditSanthi');
                        });
                        return $button;
                    }
                }
                ]
            });
        });
    }]);
})();