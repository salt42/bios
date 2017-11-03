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
        for (let property in data) {
            if (data[property].length == 0 || property == "query") continue;
            let $li = $('<li></li>');
            let $ul = $('<ul></ul>');
            let $fragment = $(document.createDocumentFragment());
            let bgColor = "#3eb9a0";
            let color = "black";
            if (data.hasOwnProperty(property)) {
                switch (property){
                    case "owners":
                        for (let i = 0; i < data[property].length; i++) {
                            $('<li></li>')
                                .html(data[property][i].name)
                                .appendTo($fragment)
                                .show();
                        }
                        $li.html(property);
                        console.log("here " + property, data[property]);
                        break;
                    case "animals":
                        bgColor = "#718eaa";
                        for (let i = 0; i < data[property].length; i++) {
                            $('<li></li>')
                                .html(data[property][i].name)
                                .appendTo($fragment)
                                .show();
                        }
                        $li.html(property);
                        console.log("here " + property, data[property]);
                        break;
                    case "deadAnimals":
                        bgColor = "#2d6987";
                        color = "white";
                        for (let i = 0; i < data[property].length; i++) {
                            $('<li></li>')
                                .html(data[property][i].name)
                                .appendTo($fragment)
                                .show();
                        }
                        $li.html(property);
                        console.log("here " + property, data[property]);
                        break;
                    case "articles":
                        bgColor = "#ffa115";
                        for (let i = 0; i < data[property].length; i++) {
                            $('<li></li>')
                                .html(data[property][i].name)
                                .appendTo($fragment)
                                .show();
                            $li.html(property);
                        }
                        break;
                    default:
                }
            }
            $li.css("background-color", bgColor)
                .css("color", color)
                .css("text-align", "right");
            $ul.append($fragment)
                .css("text-align", "left")
                .appendTo($li);
            $liveResults.append($li);
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
                if (!(searchQuery == "")){
                    bios.server.liveSearch(searchQuery, function(data) {
                        console.log(data);
                        console.log(data.query != searchQuery);
                        if (data.query != searchQuery) {
                            return;
                        }
                        updateResults(data);
                    });
                }
        }
    });
});