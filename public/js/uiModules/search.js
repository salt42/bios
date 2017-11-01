defineUI("search", function(bios, $element){
    "use strict";
    console.log("start search UI module");
    let $input = $('<input />')
        .attr("type", "text")
        .attr("name", "search")
        .attr("placeholder", "Search...")
        .appendTo($element);

    let searchQuery = "";

    // $input.on("input", function(e,a) {
    //     console.log("search changed", a, e);
    //
    // });
    $input.on("keypress", function(e) {
        switch (e.keyCode) {
            case 13:
                //enter
                searchQuery += e;
                break;
            default:
                console.log(e.key);
                searchQuery = $input.val();
                bios.server.liveSearch(searchQuery, function(data) {
                    console.log(data);
                });
        }
    });
});