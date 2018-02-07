defineComp("animal", function(bios, $element, args) {
    "use strict";

    console.log('animal loading');
    let id   = $element.data("id");
    console.log('animal', id);

    let $form = $("<json-form></json-form>")
        .appendTo($element);

    let $refreshButton = $("<button></button>")
        .appendTo($element)
        .addClass("refresh-button")
        .text("refresh")
        .on("click", function () {
            setData(id);
        })
    ;

    let $saveButton = $("<button></button>")
        .appendTo($element)
        .addClass("save")
        .text("save")
        .on("click", function() {
            let data = $form.getComponent().getData().root;
            console.log(data)
        })
    ;

    function setData(id) {
        bios.search.findAnimal(id, function(data) {
            update(data);
        });
    }

    function update(data) {
        $form.getComponent().setData(data);
    }

    setData(id);



    this.onDiscard = function() {};
});