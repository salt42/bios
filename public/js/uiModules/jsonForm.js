defineUI("jsonForm", function(bios, $element){
    "use strict";
    if (window.startUpLogLevel >= 2) console.log("start jsonForm UI module");
    $('<h1>json Form</h1>')
        .appendTo($element);

    let $form = $('<div></div>')
        .appendTo($element);

    let formData;

    let form = new jsonForm($form[0], {}, {
        meta: {
            salutation: {
                type: "select",
                options: ["Herr", "Frau"]
            }
        }
    });
    this.setData = function(data){
        formData = data;
        form.setData(data);
    };
    this.getData = function(){
        return form.getData();
    }
});