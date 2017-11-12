/**
 * Created by salt on 10.11.2017.
 */
defineComp("owners", function(bios, $element, args) {
    "use strict";
    $("<h1>owner Overview</h1>")
        .appendTo($element);

    let $table = $("<dataTable></dataTable>")
        .appendTo($element);

    bios.initAllUI($element);

    bios.search.findOwners(args.query, function(data) {
        let table = $table.data("context");
        table.setData(data, {});
        $table.append(table.getHTML());
    });


    this.onDiscard = function() {};
});