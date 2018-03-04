/**
 * Created by Fry on 17.02.2018.
 */
defineComp("therapy-session-dashboard",  function (bios, template, args) {
    "use strict";

    let $element = this.$ele;
    // let department = "therapy-session";
    // bios.departments.load(department);
    let data = [];
    let dashboardDefaults = [{
        type: "element::text",
        element: 'therapy-queue',
        text: "ts dashboard queue",
        buttonUrl: "/therapySession/queue"
    },{
        type: "html::text",
        text: "<div class='settings-icon'></div>",
        buttonText: "Settings",
        buttonUrl: "/therapySession/settings"
    },];

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
    // data = dummy(2, data);

    data = [{
        type: "text::text",
        text: "next treatment",
        buttonText: "next treatment",
        buttonUrl: "/therapySession/treatment",
        variables: true,
    }];
    /*endregion*/

    this.onLoad = function (){
        data = data.concat(dashboardDefaults);
        data = prepareData (data);
        $('#ts-dash-cards')
            // append items
            .appendTemplate(".template-ts-dash-cards", data, function (fragment, value){
                if(value.element){
                    $('div.mdl-card__title', fragment)
                        .empty()
                        .append($(value.element));
                    $('a.mdl-js-button', fragment)
                        .html(bios.trans.late(value.text))
                        .attr("url", value.buttonUrl);
                } else {
                    let url = value.buttonUrl;
                    if(value.variables){
                        let nextTreat = $($('.mdl-card')[0]);
                        url += "/" + nextTreat.data("id");
                    }
                    $('span.top', fragment).html(value.top);

                    $('a.mdl-js-button', fragment)
                        .html(value.bottom)
                        .attr("url", url);
                }
            })
        ;
        $('.mdl-card').hover(turnOnSettingsHovered, turnOffSettingsHovered);

        $('a', $element).on("click", callLink);
    };

    function callLink(e){
        let target = $(e.target);
        console.log("clicked on Card", target);
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
        else
            return objData;
    }

}, {
    templatePath: "/component/departments/therapySession/therapySessionDashboard/therapySessionDashboard.html"
});