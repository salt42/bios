/**
 * Created by salt on 10.11.2017.
 */
defineComp("dashboard", function(bios, $element, args) {
    "use strict";
    $("<h1>Dashboard</h1>")
        .appendTo($element);
    // $("<p>hier kann man das html der componente einbauen. zb ein login, oder eine liste, oder eine übersichts seite.</p>")
    //     .appendTo($element);
    //
    // $("<userlist></userlist>")
    //     .appendTo($element);
    //
    // //init all ui modules
    // bios.initAllUI($element);
    this.doSomething = function() {
        $("<p>Dashboard Update</p>")
            .appendTo($element);
    };
    this.onDiscard = function() {
        console.log("dashboard removed");
    };
});