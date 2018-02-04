define("rememberMe", function(bios) {
    "use strict";

    // $.document.ready(function () {
    //     $("div#sidebar-components").append($("<remember-me></remember-me>"));
    // });

    let data = [];
    let next = 0;
    let limit = 3;

    this.add = (addData) => {
        data[next] = addData;
        next = (next === 2) ? 0 : next++;
    };

    this.get = (id) => {
        return data[id];
    };
});