defineComp("animal", function(bios, $element, args) {
    "use strict";


    let serviceData = bios.dataService.get("animal");
    let id = (serviceData !== null) ? serviceData.id : (args && args.id) ? args.id : null;

    let $form = $("<json-form></json-form>")
        .appendTo($element);

    let $refresh = $("<button></button>")
        .appendTo($element)
        .addClass("refresh-button")
        .text("refresh")
        .on("click", function () {
            setData(id);
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