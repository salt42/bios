/**
 * Created by fry on 14.11.2017.
 */
defineComp("live-search-result", function(bios, $element, args) {
    "use strict";
    $("<h1>Live Search Result</h1>")
        .appendTo($element);


    bios.initAllUI($element);

    bios.loadComponent("owners", "mainSection", args);
    bios.loadComponent("animals", "mainSection", args);


    this.onDiscard = function() {};
});