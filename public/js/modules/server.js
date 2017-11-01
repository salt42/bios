define("server", function(bios){
    "use strict";
    console.log("start server module");
    this.liveSearch = function(searchQuery, fn) {
        //@todo send live search request to server

        //callback result
        fn([
            {
                searchResult: "structure isn't fix yet"
            }
        ]);
    }
});