defineUI("search", function(bios, $element){
    "use strict";
    if (window.startUpLogLevel >= 2) console.log("start search UI module");

    let $input = $('<input />')
        .attr("type", "text")
        .attr("name", "search")
        .attr("placeholder", "Search...")
        .appendTo($element);

    let $liveResults = $('<ul></ul>')
        .addClass("liveResults")
        .appendTo($element);

    let searchQuery = "";

    function updateResults(data){
        for (let property in data) {
            if (data[property].length == 0 || property == "query") continue;
            let $li = $('<li></li>');
            let $ul = $('<ul></ul>');
            let $fragment = $(document.createDocumentFragment());
            let bgColor = "#3eb9a0";
            let color = "black";
            let entryClass = "live-Search-";
            // add entries
            if (data.hasOwnProperty(property)) {
                switch (property){
                    case "owners":
                        for (let i = 0; i < data[property].length; i++) {
                            let a = data[property][i];
                            let htmlText = " " + a.first_name + " " + a.name + ", " + a.address;
                            $('<li></li>')
                                .addClass(entryClass + property + " fa fa-user")
                                .html(htmlText)
                                .appendTo($fragment)
                                .show();
                        }
                        // console.log("here " + property, data[property]);
                        break;
                    case "animals":
                        bgColor = "#718eaa";
                        for (let i = 0; i < data[property].length; i++) {
                            let a = data[property][i];
                            let htmlText = " " + a.name + ", " + trans(decodeS(a.species_id));
                            $('<li data-imgInfo = "' + a.species_id + '"></li>')
                                .addClass(entryClass + property + " fa fa-stethoscope")
                                .html(htmlText)
                                .appendTo($fragment)
                                .show();
                        }
                        // console.log("here " + property, data[property]);
                        break;
                    case "deadAnimals":
                        bgColor = "#2d6987";
                        color = "white";
                        for (let i = 0; i < data[property].length; i++) {
                            let a = data[property][i];
                            let htmlText = " " + a.name + ", " + trans(decodeS(a.species_id)) + ", " + a.died_on;
                            $('<li data-imgInfo = "' + a.species_id + '"></li>')
                                .addClass(entryClass + "animals-dead" + " fa fa-circle")
                                .html(htmlText)
                                .appendTo($fragment)
                                .show();
                        }
                        // console.log("here " + property, data[property]);
                        break;
                    case "articles":
                        bgColor = "#ffa115";
                        for (let i = 0; i < data[property].length; i++) {
                            let htmlText = " " + data[property][i].name;
                            $('<li></li>')
                                .addClass(entryClass + property + " fa fa-archive")
                                .html(htmlText)
                                .appendTo($fragment)
                                .show();
                        }
                        break;
                    default:
                }
            }
            $ul.append($fragment)
                .appendTo($li);
            $liveResults.append($li);
        }
        highlight(data["query"]);
    }

    /*geht nich */
    function highlight(query) {
        let $srcElements = $(".liveSearchEntry > ul > li");
        for (let i = 0; i < $srcElements.length; i++){
            let eText = $srcElements[i].text();
            query = query.replace(/(\s+)/,"(<[^>]+>)*$1(<[^>]+>)*");
            let pattern = new RegExp("("+term+")", "gi");
            eText = eText.replace(pattern, "<mark>$1</mark>");
            eText = eText.replace(/(<mark>[^<>]*)((<[^>]+>)+)([^<>]*<\/mark>)/,"$1</mark>$2<mark>$4");
            $srcElements[i].html(eText);
        }
    }

    function decodeS(value){
        return bios.trans.decode.species(value);
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
                    bios.search.liveSearch(searchQuery, function(data) {
                        // console.log(data);
                        if (data.query != searchQuery) {
                            console.log("returned query is wrong");
                            return;
                        }
                        updateResults(data);
                    });
                }
        }
    });
});