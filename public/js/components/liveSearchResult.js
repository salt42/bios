/**
 * Created by fry on 14.11.2017.
 */
defineComp("liveSearchResult", function(bios, $element, args) {
    "use strict";
    $("<h1>Live Search Result</h1>")
        .appendTo($element);


    bios.initAllUI($element);

    bios.loadComponent("owners", "mainSection", {
        query: args.query
    });
    bios.loadComponent("animals", "mainSection", {
        query: args.query
    });


    this.onDiscard = function() {};
});