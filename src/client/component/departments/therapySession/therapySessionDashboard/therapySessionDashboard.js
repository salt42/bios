/**
 * Created by Fry on 17.02.2018.
 */
defineComp("therapy-session-dashboard",  function (bios, template, args) {
    "use strict";

    let $element = this.$ele;
    let data = [];
    /* region dummy data */

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
                text: "<div class='settings-icon'></div>",
                buttonText: "Settings (type html::text)"
            });
            data.push({
                type: "img::html",
                text: "/img/ui-kit/default/employ_male.png",
                buttonText: "<span>type img::html</span>"
            });
        }
        return data;
    }

    data = dummy(3, data);
    /*endregion*/

    this.onLoad = function (){
        data = prepareData (data);
        $('#ts-dash-cards')
            // append items
            .appendTemplate(".template-ts-dash-cards", data, function (fragment, value){
                $('span.top', fragment).html(value.top);
                $('a.mdl-js-button', fragment).html(value.bottom);
            })
            //append queue as last item
            .appendTemplate(".template-ts-dash-cards", [{item: 'therapy-queue', text: "ts dashboard queue"}], function (fragment, value){
                $('div.mdl-card__title', fragment)
                    .empty()
                    .append($(value.item));
                $('a.mdl-js-button', fragment)
                    .attr("url", "/therapySession/queue")
                    .html(bios.trans.late(value.text));
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
        if(type === "img"){
            return "<img src='" + objData + "' class='ts-dash-card-image' alt='image'>";
        } else if (type === "html"){
            return objData;
        } else {
            return "<span>" + objData + "</span>";
        }
    }

}, {
    templatePath: "/component/departments/therapySession/therapySessionDashboard/therapySessionDashboard.html"
});