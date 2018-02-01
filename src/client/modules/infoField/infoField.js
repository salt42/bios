define("info", function(bios) {
    "use strict";

    this.setData = function setData(data){
        let $infoField = $("info")
            .append("<p>" + data + "</p>")
        ;
    }

});