defineComp("mc-flashcard", function(bios, $element, args) {
    "use strict";

    let type = args[0].type;
    let id   = args[0].id;
    let showOverview = !!args[1];

    /* region set up flashcard environment */
    // create top region
    let $top = $("<div class='fc-top'></div>")
        .appendTo($element)
    ;
    let $topBorder = $("<div></div>")
        .addClass('fc-top-border')
        .appendTo($top)
    ;

    // create content region
    let $content = $("<div></div>")
        .addClass('fc-content')
        .appendTo($element)
    ;

    let $overview = $("<fc-overview></fc-overview>");
    if(showOverview){
        $overview
            .appendTo($("sidebar"));
    }
    /*endregion*/

    if (showOverview){
        bios.search.mainDetails(type, id, function (data) {
            createOverview(data);
        } );
    }

    bios.search.mainDetails(type, id, function (data) {
        createFlashcards(data);

        $(".fc-top-item").on("click", function (e) {
            changeSelected(e);
        });
    } );

    /* region create single flashcards */
    function createFlashcards(fcArray){
        for (let i = 0; i < fcArray.length; i++){
            let type = fcArray[i].type;
            let dataAttr = "data-type='" + type + "' data-id='" + fcArray[i].id + "'";

            // fill in data to top region
            let $topItem = $("<div class='fc-top-item' " + dataAttr + "></div>")
                .appendTo($top)
            ;

            // fill in data to content region
            let $contentItem = $("<div class='fc-content-item' " + dataAttr + ">[ " + type + " ] loaded for id [ " + fcArray[i].id + " ]</div>")
                .append($("<" + type + dataAttr + "></" + type + ">"))
                .appendTo($content)
            ;

            // check if card is selected
            if (fcArray[i].selected) {
                $topItem.addClass("selected");
                $contentItem.addClass("selected");
            }
        }
    }
    /*endregion*/
    function createOverview(data){
        for (let i = 0; i < data.length; i++) {
            let type = data[i].type;
            let dataAttr = "data-type='" + type + "' data-id='" + data[i].id + "'";
            let classAttr = (data[i].selected) ? " selected" :"";

            $("<li class='fco-item hidden" + classAttr + "' " + dataAttr + "></li>")
                .appendTo($overview)
            ;
        }
    }

    function changeSelected(e){
        let $ele = e.target;
        $(".fc-top-item").removeClass("selected");
        $(".fc-content-item").removeClass("selected");
        $("mc-flashcard [data-type='" + $ele.dataset.type + "'][data-id='" + $ele.dataset.id + "']").addClass("selected");
    }

});