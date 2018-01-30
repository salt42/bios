defineComp("animal", function(bios, $element, args) {
    "use strict";

    let $flashcard = $("<flashcard></flashcard>")
        .appendTo($element);

    //@todo get data to comp flashcard
    // let flashcardData = {
    //     text: bios.trans.language("animal"),
    //     ggfhtml: $form,
    // };

    let $form = $("<json-form></json-form>")
        .appendTo($element);

    let $refresh = $("<button></button>")
        .appendTo($element)
        .addClass("refresh-button")
        .text("refresh")
        .on("click", function () {
            bios.search.findAnimal(args.id, function(data) {
                update(data);
            });
        })
    ;

    let $save = $("<button></button>")
        .appendTo($element)
        .addClass("save")
        .text("save")
        .on("click", function() {
            let data = $form.getComponent().getData().root;
            console.log(data)
        })
    ;

    function update(data) {
        $form.getComponent().setData(data);
    }

    bios.search.findAnimal(args.id, function(data) {
        update(data);
    });



    this.onDiscard = function() {};
});