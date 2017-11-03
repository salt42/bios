defineUI("search", function(bios, $element){
    "use strict";


    console.log("start search UI module");
    let $input = $('<input />')
        .attr("type", "text")
        .attr("name", "search")
        .attr("placeholder", "Search...")
        .appendTo($element);

    let $liveResults = $('<ul></ul>')
        .addClass("liveResults")
        .appendTo($element);

    let searchQuery = "";

    // $input.on("input", function(e,a) {
    //     console.log("search changed", a, e);
    //
    // });

    function updateResults(data){
        console.log("'''", data.owners);
        let $fragment = $(document.createDocumentFragment());
        let c = data.owners.length;
        if (c > 0) {
            //@todo for owner, animals, articles
            for (let i = 0; i< data.owners.length; i++) {
                $('<li></li>')
                    .html(data.owners[i].name)
                    .appendTo($fragment)
                    .show();
            }
            console.log($fragment);
            $liveResults.append($fragment);
        }
    }

    $input.on("keyup", function(e) {
        $liveResults.empty();
        searchQuery = $input.val();
        switch (e.keyCode) {
            case 13:
                //enter
                break;
            default:
                // console.log(e.key);
                bios.server.liveSearch(searchQuery, function(data) {
                    console.log(data);
                    console.log(data.query != searchQuery);
                    if (data.query != searchQuery) {
                        return;
                    }
                    updateResults(data);
                });
        }
    });
});