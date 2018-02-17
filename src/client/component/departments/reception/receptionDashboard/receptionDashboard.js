defineComp("reception-dashboard",  function (bios, template, args) {
    "use strict";

    //dummy data
    let data = [];

    function dummy (count, data) {
        let i = 0;
        while (i < count) {
            i++;
            data.push({
                type: "text::text",
                text: "type text::text",
                buttonText: "type text::text"
            });
            data.push({
                type: "html::text",
                text: "<span>type html::text</span>",
                buttonText: "type html::text"
            });
            data.push({
                type: "img::html",
                text: "img/path",
                buttonText: "<span>type img::html</span>"
            });
        }
        return data;
    }

    data = dummy(3, data);

    this.onLoad = function (){
        data = prepareData (data);
        $('#reception-cards').appendTemplate(".template-reception-cards", data, function (fragment, value){
            $('span.top', fragment).html(value.top);
            $('a.mdl-js-button', fragment).html(value.bottom);
        });
    };

    function prepareData(data) {
        for (let i = 0; i < data.length; i++) {
            if (!data[i].type) data[i].type = "text::text";  //set default type
            let parts = data[i].type.split("::");
            data[i].top    = createCardStrings(parts[0], data[i].text);
            data[i].bottom = createCardStrings(parts[1], data[i].buttonText);
        }
        return data;
    }

    function createCardStrings (type, objData) {
        if(type === "img"){
            return "<img src='" + objData + "' class='reception-dash-card-image' alt='image'>";
        } else if (type === "html"){
            return objData;
        } else {
            return "<span>" + objData + "</span>";
        }
    }

}, {
    templatePath: "/component/departments/reception/receptionDashboard/receptionDashboard.html"
});