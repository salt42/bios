define("info", function(bios) {
    "use strict";

    $("sidebar").append($("<info></info>"));

    let data = "";

    this.setData = (setData) => {
        data = setData;
        update();
    };
    this.addData = (addData) => {
        data += addData;
        update();
    };

    function update(){
        let $infoField = $("info")
            .append(data)
    }
});