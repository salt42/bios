/**
 * Created by salt on 10.11.2017.
 */
defineComp("animal", function(bios, $element, args) {
    "use strict";
    $("<h1>animal</h1>")
        .appendTo($element);

    let $form = $("<json-form></json-form>")
        .appendTo($element);

    bios.initAllUI($element);

    bios.search.findAnimal(args.id, function(data) {
        console.log(data);
        // let table = $table.data("context");
        // table.setData(data, {});
        // $table.append(table.getHTML());
        $form.data("context").setData(data);
    });


    this.onDiscard = function() {};
});