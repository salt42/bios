/**
 * Created by fry on 14.11.2017.
 */
defineComp("live-search-result", function(bios, template, args) {

    // console.log("loading live-search-result COMP");

    let $element = this.$ele;

    this.onLoad = function () {
        // console.log("loaded live-search-result COMP");
    };

    this.updateResults = function (data) {
        $element.removeClass("hidden");
        for (let property in data) {
            if (!data.hasOwnProperty(property)) continue;
            if (data[property].length === 0 || property === "query") continue;
            let type;
            // add entries
            switch (property){
                case "owners":
                    type = "owner";
                    $('li.group-' + type).removeClass("hidden");
                    $('span', 'li.group-' + type).html(bios.trans.late("live search result " + type));

                    $('ul.items', 'li.group-' + type)
                        .empty()
                        .appendTemplate(".template-live-search-result-item", data.owners, function (template, value) {
                        $('li', template)
                            .addClass("fa-user")
                            .attr("type", type)
                            .attr(type + "-id", value.id)
                            .html(value.first_name + " " + value.name + ", " + value.address)
                        ;
                    });
                    break;
                case "animals":
                    type = "animal";
                    $('li.group-' + type).removeClass("hidden");
                    $('span', 'li.group-' + type).html(bios.trans.late("live search result " + type));

                    $('ul.items', 'li.group-' + type)
                        .empty()
                        .appendTemplate(".template-live-search-result-item", data.animals, function (fragment, value) {
                        $('li', fragment)
                            .addClass("fa-paw")
                            .attr("type", type)
                            .attr(type + "-id", value.id)
                            .html(value.name + ", " + trans(denumS(value.species_id)))
                        ;
                    });
                    break;
                case "deadAnimals":
                    type = "animal-d";
                    $('li.group-' + type).removeClass("hidden");
                    $('span', 'li.group-' + type).html(bios.trans.late("live search result " + type));

                    $('ul.items', 'li.group-animal-d')
                        .empty()
                        .appendTemplate(".template-live-search-result-item", data.deadAnimals, function (fragment, value) {
                        $('li', fragment)
                            .addClass("fa-circle")
                            .attr("type", type)
                            .attr(type + "-id", value.id)
                            .html(value.name + ", " + trans(denumS(value.species_id)) + ", " + value.died_on)
                        ;
                    });
                    break;
                case "articles":
                    type = "article";
                    $('li.group-' + type).removeClass("hidden");
                    $('span', 'li.group-' + type).html(bios.trans.late("live search result " + type));

                    $('ul.items', 'li.group-' + type)
                        .empty()
                        .appendTemplate(".template-live-search-result-item", data.articles, function (fragment, value) {
                        $('li', fragment)
                            .addClass("fa-archive")
                            .attr("type", type)
                            .attr(type + "-id", value.id)
                            .html(value.name)
                        ;
                    });
                    break;
            }
        }
        highlight(data.query);
        bios.rxLiveSearch.upStream.next($element);

    };

    function highlight(query) {
        let $srcElements = $(".live-search-result-item");
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

    this.getResult = function (){
        return $element;
    };
    //
    // $liveResults.on("click", function(e) {
    //     let $target = $(e.target),
    //         type = $target.attr("type"),
    //         id = $target.attr(type + '-id')
    //     ;
    //
    //     if (!$target.hasClass("live-search")) return;
    //
    //     bios.ems.ems_LiveSearch ({
    //         type: type,
    //         id: id
    //     });
    //     $input.val("");
    //     $liveResults.not("hidden").addClass("hidden");
    //
    // });
    }
    ,{
        templatePath: "/component/liveSearch/liveSearchResult/liveSearchResult.html"
    }
);


// <ul class="demo-list-icon mdl-list">
//     <li class="mdl-list__item">
//     <span class="mdl-list__item-primary-content">
//     <i class="material-icons mdl-list__item-icon">person</i>
//     Bryan Cranston
// </span>
// </li>
// <li class="mdl-list__item">
//     <span class="mdl-list__item-primary-content">
//     <i class="material-icons mdl-list__item-icon">person</i>
//     Aaron Paul
// </span>
// </li>
// <li class="mdl-list__item">
//     <span class="mdl-list__item-primary-content">
//     <i class="material-icons mdl-list__item-icon">person</i>
//     Bob Odenkirk
// </span>
// </li>
// </ul>