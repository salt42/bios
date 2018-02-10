defineComp("live-search", function(bios, template){
    "use strict";

    let $element = this.$ele;

    if (window.startUpLogLevel >= 2) console.log("start search UI module");
    let $input = $('<input />')
        .attr("id", "fixed-header-drawer-exp")
        .addClass("mdl-textfield__input")
        .attr("type", "text")
        .attr("name", "search")
        .attr("placeholder", bios.trans.late("liveSearch placeholder") )
        .appendTo($element);

    let $liveResults = $('<ul></ul>')
        .addClass("liveResults")
        .appendTo($element);

    let searchQuery = "";
    let resultSet;

    function updateResults(data){
        for (let property in data) {
            if (!data.hasOwnProperty(property)) continue;
            if (data[property].length === 0 || property === "query") continue;
            let $li = $('<li></li>');
            let $ul = $('<ul></ul>');
            let $fragment = $(document.createDocumentFragment());
            let entryClass = "live-search";
            // add entries
            if (data.hasOwnProperty(property)) {
                // console.log('##', property);
                switch (property){
                    case "owners":
                        $li = $('<li class="owner-group group"></li>')
                            .html(bios.trans.language("owner"));
                        for (let i = 0; i < data[property].length; i++) {
                            let a = data[property][i];
                            let htmlText = " " + a.first_name + " " + a.name + ", " + a.address;
                            $('<li></li>')
                                .addClass(entryClass + " fa fa-user")
                                .attr("type", 'owner')
                                .attr("owner-id", a.id)
                                .html(htmlText)
                                .appendTo($fragment)
                                .show();
                        }
                        // console.log("here " + property, data[property]);
                        break;
                    case "animals":
                        $li = $('<li class="animals-group group"></li>')
                            .html(bios.trans.language("animals"));
                        for (let i = 0; i < data[property].length; i++) {
                            let a = data[property][i];
                            let htmlText = " " + a.name + ", " + trans(denumS(a.species_id));
                            $('<li data-imgInfo = "' + a.species_id + '"></li>')
                                .addClass(entryClass + " fa fa-paw")
                                .attr("type", 'animal')
                                .attr("animal-id", a.id)
                                .html(htmlText)
                                .appendTo($fragment)
                                .show();
                        }
                        // console.log("here " + property, data[property]);
                        break;
                    case "deadAnimals":
                        $li = $('<li class="dead-animals-group group"></li>')
                            .html(bios.trans.language("dead animals"));
                        for (let i = 0; i < data[property].length; i++) {
                            let a = data[property][i];
                            let htmlText = " " + a.name + ", " + trans(denumS(a.species_id)) + ", " + a.died_on;
                            $('<li data-imgInfo = "' + a.species_id + '"></li>')
                                .addClass(entryClass + " animal-dead" + " fa fa-circle")
                                .attr("type", 'animal')
                                .attr("animal-id", a.id)
                                .html(htmlText)
                                .appendTo($fragment)
                                .show();
                        }
                        // console.log("here " + property, data[property]);
                        break;
                    case "articles":
                        $li = $('<li class="articles-group group"></li>')
                            .html(bios.trans.language("articles"));
                        for (let i = 0; i < data[property].length; i++) {
                            let a = data[property][i];
                            let htmlText = " " + a.name;
                            $('<li></li>')
                                .addClass(entryClass + " fa fa-archive")
                                .attr("type", 'article')
                                .attr("article-id", a.id)
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

    function highlight(query) {
        let $srcElements = $(".live-search");
        for (let i = 0; i < $srcElements.length; i++){
            let text = $srcElements[i];
            let sQuery = query.substr(0,query.length-1);
            let regex = new RegExp(sQuery, 'gi');
            let response = text.innerText.replace(regex, function(str) {
                return "<span class='highlight'>" + str + "</span>"
            });
            text.innerHTML = response

        }
    }

    function denumS(value){
        return bios.trans.decode.species(value);
    }

    $liveResults.on("click", function(e) {
        let $target = $(e.target),
            type = $target.attr("type"),
            id = $target.attr(type + '-id')
        ;

        if (!$target.hasClass("live-search")) return;

        bios.ems.ems_LiveSearch ({
            type: type,
            id: id
        });
        $input.val("");
        $liveResults.not("hidden").addClass("hidden");

    });

    /* region search bar behavior */
    $input.on("keyup", function(e) {
        $liveResults.empty()
            .removeClass("hidden");
        searchQuery = $input.val();
        // console.log(e.keyCode);
        switch (e.keyCode) {
            case 16: // = shift
            case 20: // = caps lock
            case 18: // = alt
                break; // do nothing
            case 13: // = enter
                // @todo save last view
                bios.loadComponent("live-searchresult", "mainSection", {
                    query: searchQuery,
                    resultSet: resultSet,
                });
                $liveResults.not("hidden").addClass("hidden");
                break;
            default:
                if (!(searchQuery === "")){
                    // add wildcard to search
                    if (!(searchQuery.slice(-1) === "*"))
                        searchQuery += "*";
                    // console.log("query: ", searchQuery);
                    bios.search.liveSearch(searchQuery, function(data) {
                        // console.log(data);
                        if (data.query !== searchQuery) {
                            console.log("returned query is wrong");
                            return;
                        }
                        resultSet = data;
                        updateResults(data);
                    }, "short");
                }
        }
    });
    /*endregion*/
}
// ,{
//     templatePath: "/component/liveSearch/liveSearch.html"
// }
);