define("search", function(bios){
    "use strict";
    this.liveSearch = function(searchQuery, fn, option) {
        //@todo send live search request to server

        if (option === "short"){
            $.ajax({
                url: "/search/live/short/" + searchQuery,
                type: "GET",
                // contentType: "application/json",
                // data: JSON.stringify(conf),
                success: function (resData) {
                    // console.log(resData)
                    if (searchQuery !== "")
                        fn(resData);
                }
            });
        }
        else {
            $.ajax({
                url: "/search/live/all/" + searchQuery,
                type: "GET",
                // contentType: "application/json",
                // data: JSON.stringify(conf),
                success: function (resData) {
                    // console.log(resData)
                    if (searchQuery !== "")
                        fn(resData);
                }
            });
        }
    };
    this.getList = function (searchQuery, fn){
        $.ajax({
            url: "/search/list/" + searchQuery,
            type: "GET",
            success: function (resData) {
                // console.log(resData)
                    fn(resData);
            }
        });
    };
    this.userSearch = function (fn){
        $.ajax({
            url: "/search/user",
            type: "GET",
            success: function (resData) {
                // console.log(resData)
                    fn(resData);
            }
        });
    };
    this.findOwners = function (searchQuery, fn){
        $.ajax({
            url: "/search/owners/" + searchQuery,
            type: "GET",
            success: function (resData) {
                // console.log(resData)
                    fn(resData);
            }
        });
    };
    this.findOwner = function (searchQuery, fn){
        $.ajax({
            url: "/search/owner/" + searchQuery,
            type: "GET",
            success: function (resData) {
                // console.log(resData)
                    fn(resData);
            }
        });
    };
    this.findAnimals = function (searchQuery, fn){
        $.ajax({
            url: "/search/animals/" + searchQuery,
            type: "GET",
            success: function (resData) {
                // console.log(resData)
                    fn(resData);
            }
        });
    };
    this.findAnimal = function (searchQuery, fn){
        $.ajax({
            url: "/search/animal/" + searchQuery,
            type: "GET",
            success: function (resData) {
                // console.log(resData)
                fn(resData);
            }
        });
    };
    this.findArticle = function (searchQuery, fn){
        $.ajax({
            url: "/search/article/" + searchQuery,
            type: "GET",
            success: function (resData) {
                // console.log(resData)
                fn(resData);
            }
        });
    };
});