define("rememberMe", function(bios) {
    "use strict";

    $("section#remember-me").append( $("<remember-me></remember-me>"));

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