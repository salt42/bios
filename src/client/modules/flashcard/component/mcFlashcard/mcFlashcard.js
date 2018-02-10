defineComp("mc-flashcard", function(bios, $element, args) {
    "use strict";

    console.log('Comp mc-flashcard loaded');

    if(args){
        let type = args.type;
        let id   = args.id;
        let showOverview = !!args[1];
    }

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
    /*endregion*/
    bios.ems.flashcard.subscribe( function (rxData) {
        console.log(rxData);
        for (let i = 0; i < rxData.data.length; i++) {
            let obj = rxData.data[i];
            if(obj.selected !== true) continue;
            console.log(obj);
            createFlashcards(obj);
                // get all animal data
                // bios.search.mainDetails(data.data.type, data.data.id, function (dbData) {
                //     createFlashcards(dbData);
                //     $(".fc-top-item").on("click", function (e) {
                //         changeSelected(e);
                //     } );
                // } );
        }
    } );

    /* region create single flashcards */
    function createFlashcards(dbArray){
        for (let i = 0; i < dbArray.length; i++){
            let data = dbArray[i];
            let type = data.type;
            let testString = "[ " + type + " ] loaded for id [ " + data.id + " ]"

            // fill in data to top region
            let $topItem = $("<div></div>")
                .addClass("fc-top-item")
                .attr("data-type", type)
                .attr("data-id", data.id)
                .text(data.name)
                .appendTo($top)
            ;

            // fill in data to content region
            let $contentItem = $("<div>" + testString + "</div>")
                .addClass("fc-content-item")
                .attr("data-type", type)
                .attr("data-id", data.id)
                .appendTo($content)
            ;
            let a = $("<" + type + ">");
            a.attr("data-id", data.id);
            a.appendTo($contentItem);
            bios.loadComponent(a, function() {
                console.log("loaded")
            });
            // check if card is selected
            if (data.selected) {
                $topItem.addClass("selected");
                $contentItem.addClass("selected");
            }
        }
    }
    /*endregion*/
//den luxus das es die comps automatisch läd hast du nur hier in dem scope
    function changeSelected(e){
        let $ele = e.target;
        $(".fc-top-item").removeClass("selected");
        $(".fc-content-item").removeClass("selected");
        $("mc-flashcard [data-type='" + $ele.dataset.type + "'][data-id='" + $ele.dataset.id + "']").addClass("selected");
    }
    this.onLoad = function() {
    };
});