define("info", function(bios) {
    "use strict";
console.log(bios);
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
        $("info-field")//
            .html(data)
    }
});