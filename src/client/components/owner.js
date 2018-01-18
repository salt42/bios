/**
 * Created by salt on 10.11.2017.
 */
defineComp("owner", function(bios, $element, args) {
    "use strict";
    $("<h1>owner</h1>")
        .appendTo($element);

    let $form = $("<jsonForm></jsonForm>")
        .addClass("owner-details")
        .appendTo($element);

    let $save = $('<button class="save"></button>')
        .appendTo($element);

    $("<div>owners animals (list)</div>")
        .appendTo($element);

    $("<div>bills list</div>")
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