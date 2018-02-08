define("info", function(bios) {
    "use strict";

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
        $("info-field")//
            .html(data)
    }
});