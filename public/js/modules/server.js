define("server", function(bios){
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

        // let result = {
        //     query: searchQuery,
        //     results: [
        //         {
        //             type: "owner",
        //             name: "Salty Salt",
        //             addr: "Mondweg 3"
        //         },
        //         {
        //             type: "animal",
        //             name: "Tüte"
        //         }
        //     ]
        // };
        //callback result
        // if (searchQuery != "")
        //     fn();
    }
});