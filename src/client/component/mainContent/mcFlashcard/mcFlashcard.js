defineComp("mc-flashcard", function(bios, $element, args) {
    "use strict";

    //todo workaround
    let fcArray = (args && Array.isArray(args)) ? args : (bios.transferData.fc && Array.isArray(bios.transferData.fc)) ? bios.transferData.fc : null;

    if (fcArray === null) return; //or throw error


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
        // .css("height", fcHeight)
    ;

    for (let i = 0; i < fcArray.length; i++){
        let selected = (fcArray[i].selected && fcArray[i].selected === true);
        let type = fcArray[i].type;
        let id = fcArray[i].content.id;
        //@todo workarond
        bios.transferData[type] = {};
        bios.transferData[type]["id"]= fcArray[i].content.id;

        // fill in data to top region
        let $topItem = $("<div class='fc-top-item' data-type='" + type + "' data-id='" + id + "'></div>")
            .appendTo($top)
            .text(fcArray[i].top.name)
            .append("<br/>" + fcArray[i].top.info)
            ;

        // fill in data to content region
        let $contentItem = $("<div class='fc-content-item' data-type='" + type + "' data-id='" + id + "'>[ " + type + " ] loaded for id [ " + id + " ]</div>")
            .append($("<" + type + "></" + type + ">"))
            .appendTo($content)
        ;

        if (selected) {
            $topItem.addClass("selected");
            $contentItem
                .addClass("selected")
            ;
        }
    }

    let $allTop = $(".fc-top-item");
    let $allCon = $(".fc-content-item");

    $allTop.on("click", function (e) {
        changeSelected(e);
    });

    function changeSelected(e){
        let $ele = e.target;
        console.log("outch, you hit me on ", $ele);
        let dType = $ele.dataset.type;
        let dID = $ele.dataset.id;
        $allTop.removeClass("selected");
        $allCon.removeClass("selected");
        $("[data-type='" + dType + "'][data-id='" + dID + "']").addClass("selected");
    }
});