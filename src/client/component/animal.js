defineComp("animal", function(bios, $element, args) {
    "use strict";

    let id = (args && args.id) ? args.id : (bios.transferData.animal.id) ? bios.transferData.animal.id : null;

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

    bios.search.findAnimal(id, function(data) {
        update(data);
    });



    this.onDiscard = function() {};
});