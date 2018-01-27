/**
 * Created by salt on 10.11.2017.
 */
defineComp("owner", function(bios, $element, args) {
    "use strict";
    $("<h1>owner</h1>")
        .appendTo($element);

    let $form = $("<json-form></json-form>")
        .addClass("owner-details")
        .appendTo($element);

    let $save = $('<button class="save"></button>')
        .appendTo($element);

    $save.on("click", function() {
        let data = $form.data("context").getData().root;
        console.log(data);
        //send to sever
    });
    bios.initAllUI($element);

    console.log(args);
    bios.search.findOwner(args.id, function(data) {
        console.log(data);
        $form.data("context").setData(data);
    });

    this.onDiscard = function() {};
});