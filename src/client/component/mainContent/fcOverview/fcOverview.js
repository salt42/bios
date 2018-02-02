defineComp("fc-overview", function(bios, $element, args) {
    "use strict";


    let $items = $("li.fco-item", $element);
    console.log($items);
    $items
        .removeClass("hidden")
    ;

    /* region functionality */
    let $allTopItems = $(".fc-top-item");
    let $allContents = $(".fc-content-item");

    $allTopItems.on("click", function (e) {
        changeSelected(e);
    });

    function changeSelected(e){
        let $ele = e.target;
        $allTopItems.removeClass("selected");
        $allContents.removeClass("selected");
        $("[data-type='" + $ele.dataset.type + "'][data-id='" + $ele.dataset.id + "']").addClass("selected");
    }
    /*endregion*/

});