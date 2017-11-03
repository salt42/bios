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
            let entryClass = "liveSearchEntry ";
            // add entries
            if (data.hasOwnProperty(property)) {
                switch (property){
                    case "owners":
                        for (let i = 0; i < data[property].length; i++) {
                            $('<li></li>')
                                .addClass(entryClass + property)
                                .html(data[property][i].name)
                                .appendTo($fragment)
                                .show();
                        }
                        console.log("here " + property, data[property]);
                        break;
                    case "animals":
                        bgColor = "#718eaa";
                        for (let i = 0; i < data[property].length; i++) {
                            $('<li data-imgInfo = "' + data[property][i].species_id + '"></li>')
                                .addClass(entryClass + property)
                                // .setAttribute("info","test")
                                // .dataset.info = "test"
                                .html(data[property][i].name)
                                .appendTo($fragment)
                                .show();
                        }
                        console.log("here " + property, data[property]);
                        break;
                    case "deadAnimals":
                        bgColor = "#2d6987";
                        color = "white";
                        for (let i = 0; i < data[property].length; i++) {
                            $('<li data-imgInfo = "' + data[property][i].species_id + '"></li>')
                                .addClass(entryClass + property + " animals dead")
                                .html(data[property][i].name)
                                .appendTo($fragment)
                                .show();
                        }
                        console.log("here " + property, data[property]);
                        break;
                    case "articles":
                        bgColor = "#ffa115";
                        for (let i = 0; i < data[property].length; i++) {
                            $('<li></li>')
                                .addClass(entryClass + property)
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
        addIcons();
        highlight(data["query"]);
    }

    function addIcons() {
        let $elements = $('.liveSearchEntry.owners');
        $('<img src="/img/ui-kit/default/owner.png" alt="o">')
            .addClass("liveSearchIcon")
            .prependTo($elements);

        $elements = $('.liveSearchEntry.articles');
        $('<img src="/img/ui-kit/default/article.png" alt="o">')
            .addClass("liveSearchIcon")
            .prependTo($elements);

        $elements = $('.liveSearchEntry.animals');
        for (let i = 0; i < $elements.length; i++){
            let dataInfo = parseInt($elements[i].getAttribute("data-imgInfo"));
            let imgPath;
            // bios.server.getSpeciesImages()
            switch (dataInfo){
                case 1:
                    // @toDo get string from db
                    imgPath = "/img/ui-kit/default/dog.png";
                    console.log('ss');
                    break;
                case 2:
                    imgPath = "/img/ui-kit/default/cat.png";
                    break;
                default:
                    imgPath = "/img/ui-kit/default/animal.png";
                    console.log(dataInfo);
            }
            $('<img src="' + imgPath + '" alt="o">')
                .addClass("liveSearchIcon")
                .prependTo($elements[i]);
        }
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