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
            if (!data.hasOwnProperty(property)) continue;
            if (data[property].length === 0 || property === "query") continue;
            let $li = $('<li></li>');
            let $ul = $('<ul></ul>');
            let $fragment = $(document.createDocumentFragment());
            let bgColor = "#3eb9a0";
            let color = "black";
            let entryClass = "live-search";
            // add entries
            if (data.hasOwnProperty(property)) {
                switch (property){
                    case "owners":
                        for (let i = 0; i < data[property].length; i++) {
                            let a = data[property][i];
                            let htmlText = " " + a.first_name + " " + a.name + ", " + a.address;
                            $('<li></li>')
                                .addClass(entryClass + " fa fa-user")
                                .attr("type", property)
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
                            let htmlText = " " + a.name + ", " + trans(denumS(a.species_id));
                            $('<li data-imgInfo = "' + a.species_id + '"></li>')
                                .addClass(entryClass + " fa fa-stethoscope")
                                .attr("type", property)
                                // .setAttribute("info","test")
                                // .dataset.info = "test"
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
                            let htmlText = " " + a.name + ", " + trans(denumS(a.species_id)) + ", " + a.died_on;
                            $('<li data-imgInfo = "' + a.species_id + '"></li>')
                                .addClass(entryClass + "animals-dead" + " fa fa-circle")
                                .attr("type", property)
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
                                .addClass(entryClass + " fa fa-archive")
                                .attr("type", property)
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

    function denumS(value){
        return bios.trans.decode.species(value);
    }

    $liveResults.on("click", function(e) {
        let $target = $(e.target),
            type = $target.attr("type");

        if (!$target.hasClass("live-search")) return;

        bios.loadComponent(type, "mainSection", {
            query: searchQuery
        });
        $liveResults.not("hidden").addClass("hidden");
    });

    $input.on("keyup", function(e) {
        $liveResults.empty()
            .removeClass("hidden");
        searchQuery = $input.val();
        switch (e.keyCode) {
            case 13:
                //enter
                bios.loadComponent("owners", "mainSection", {
                    query: searchQuery
                });
                $liveResults.not("hidden").addClass("hidden");
                break;
            default:
                // console.log(e.key);
                if (!(searchQuery === "")){
                    bios.search.liveSearch(searchQuery, function(data) {
                        // console.log(data);
                        if (data.query !== searchQuery) {
                            console.log("returned query is wrong");
                            return;
                        }
                        updateResults(data);
                    });
                }
        }
    });
});