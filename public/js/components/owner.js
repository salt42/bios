/**
 * Created by salt on 10.11.2017.
 */
defineComp("owner", function(bios, $element, args) {
    "use strict";
    $("<h1>owner Overview</h1>")
        .appendTo($element);

    let $table = $("<jsonForm></jsonForm>")
        .appendTo($element);

    bios.initAllUI($element);

    bios.search.findOwner(args.query, function(data) {
        let table = $table.data("context");
        table.setData(data, {});
        $table.append(table.getHTML());
    });


    this.onDiscard = function() {};
});