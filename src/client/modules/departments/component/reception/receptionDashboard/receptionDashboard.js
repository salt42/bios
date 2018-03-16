defineComp("reception-dashboard",  function (bios, template, args) {
    "use strict";

    let $element = this.$ele;
    let data = [];
    let dashboardDefaults = [{
        type: "html::text",
        text: "<div class='settings-icon'></div>",
        buttonText: "Settings",
        buttonUrl: "/reception/settings"
    }];
    /* region dummy data */
    function dummy (count, data) {
        let i = 0;
        while (i < count) {
            i++;
            data.push({
                type: "text::text",
                text: "type text::text",
                buttonText: "type text::text",
                buttonUrl: ""
            });
            data.push({
                type: "html::text",
                text: "<div style='background: blue; width: 30px; height:30px;'></div>",
                buttonText: "Settings (type html::text)",
                buttonUrl: ""
            });
            data.push({
                type: "img::html",
                text: "/img/ui-kit/default/employ_male.png",
                buttonText: "<span>type img::html</span>",
                buttonUrl: ""
            });
        }
        return data;
    }
    data = dummy(2, data);
    /*endregion*/

    this.onLoad = function (){
        data = data.concat(dashboardDefaults);
        this.data = data;
        data = prepareData (data);
        $('#reception-dash-cards', $element)
        // append items
            .appendTemplate("#template-reception-dashboard-reception-cards", data, function (fragment, value){
                if(value.element){
                    $('div.mdl-card__title', fragment)
                        .empty()
                        .append($(value.element));
                    $('a.mdl-js-button', fragment)
                        .html(bios.trans.late(value.text))
                        .attr("url", value.buttonUrl);
                } else {
                    $('span.top', fragment).html(value.top);
                    $('a.mdl-js-button', fragment)
                        .html(value.bottom)
                        .attr("url", value.buttonUrl);
                }
            })
        ;
        $('.mdl-card').hover(turnOnSettingsHovered, turnOffSettingsHovered);

        $('a', $element).on("click", callLink);
    };

    function callLink(e){
        let target = $(e.target);
        if(target.attr("url"))
            bios.AppState.goToUrl(target.attr("url"));
        // if(target.attr("state"))
        //     bios.AppState.goToState(target.attr("state"));
    }

    function turnOnSettingsHovered(e) {
        if($(e.target).has("div.settings-icon")) {
            $("div.settings-icon", $(e.target)).not("hovered").addClass("hovered");
        }
    }
    function turnOffSettingsHovered(e) {
        if($(e.target).has("div.settings-icon")) {
            $("div.settings-icon", $(e.target)).removeClass("hovered");
        }
    }

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
        if(type === "img")
            return "<img src='" + objData + "' class='ts-dash-card-image' alt='image'>";
        else if (type === "text")
            return "<span>" + objData + "</span>";
        else
            return objData;
    }

}, {
    templatePath: "/component/departments/reception/receptionDashboard/receptionDashboard.html"
});