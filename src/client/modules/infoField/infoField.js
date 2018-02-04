define("info", function(bios) {
    "use strict";

    // this.onLoad( function (){
    //     bios.sections.load("info", "info");
    // });

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
        $("info")
            .html(data)
    }
});