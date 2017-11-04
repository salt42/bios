define("search", function(bios){
    "use strict";
    this.liveSearch = function(searchQuery, fn) {
        //@todo send live search request to server

        $.ajax({
            url: "/search/all/" + searchQuery,
            type: "GET",
            // contentType: "application/json",
            // data: JSON.stringify(conf),
            success: function (resData) {
                console.log(resData)
                if (searchQuery != "")
                    fn(resData);
            }
        });
    }
    this.userSearch = function (fn){
        $.ajax({
            url: "/search/user",
            type: "GET",
            success: function (resData) {
                console.log(resData)
                    fn(resData);
            }
        });
    }
});