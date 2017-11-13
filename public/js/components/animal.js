/**
 * Created by salt on 10.11.2017.
 */
defineComp("animal", function(bios, $element, args) {
    "use strict";
    $("<h1>animal</h1>")
        .appendTo($element);

    let $form = $("<jsonForm></jsonForm>")
        .appendTo($element);

    bios.initAllUI($element);

    bios.search.findAnimal(args.id, function(data) {
        console.log(data);
        // let table = $table.data("context");
        // table.setData(data, {});
        // $table.append(table.getHTML());
    });


    this.onDiscard = function() {};
});