defineUI("search", function(bios, $element){
    "use strict";
    console.log("start search UI module");
    let $input = $('<input />')
        .attr("type", "text")
        .attr("name", "search")
        .attr("placeholder", "Search...")
        .append($element);

    //gut nacht
    console.log($element );
    // $input.on("change", function() {
    //     console.log("search changed");
    //     bios.server.liveSearch();
    // });
});