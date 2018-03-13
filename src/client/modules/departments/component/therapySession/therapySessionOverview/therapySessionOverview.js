/**
 * Created by Fry on 10.02.2018.
 */
defineComp("therapy-session-overview",  function (bios, template, args) {
    "use strict";

    let $element = this.$ele;
    let id = 123;
    // bios.appState.onAppStateChanged.subscribe()
    //console.log('#####',args);
    // // let id = args.id;
    // let department = "therapy-session";
    // let data = bios.departments.load(department, "overview", id).therapySession;
    // let cases = data.cases;
    // let customerData = data.customer;

    this.onLoad = function(){
        let $card_1 = getNewCard()
            .setIcon("customer")
            .setTitle("Owner")
            .setContent($('<therapy-session-customer-data-view>'))
            .setButtons(["edit Owner"])
            .appendTo($element);
        let $card_2 = getNewCard()
            .setIcon("cases")
            .setTitle("Cases")
            .setContent("kuckuck")
            .setButtons(["new Case"])
            .appendTo($element);
        let $card_3 = getNewCard()
            .setIcon("treatments")
            .setTitle("Treatments")
            .setContent("kuckuck")
            .setButtons(["new treatment"])
            .appendTo($element);

        bios.loadSubComponents($card_1);
        // componentHandler.upgradeDom();
    };

    function getNewCard(){
        let card = `<div class="mdl-card mdl-shadow--2dp">
            <div class="mdl-card__title">
                <h2 class="mdl-card__title-text"></h2>
            </div>
            <div class="mdl-card__supporting-text"></div>
            <div class="mdl-card__actions mdl-card--border"></div>
        </div>`;
        return addFunctions($(card));
    }

    function addFunctions($item){
        $item.setTitle = function (title){
            $('.mdl-card__title-text', this).html(title);
            return this;
        };
        $item.setContent = function (content){
            $('.mdl-card__supporting-text', this).html(content);
            return this;
        };
        $item.setButtons = function (buttonText){
            if (!Array.isArray(buttonText)) buttonText = [buttonText];
            for (let i = 0; i < buttonText.length; i++) {
                $('<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">')
                    .html(buttonText[i])
                    .appendTo($('.mdl-card__actions', this));
            }
            return this;
        };
        $item.setIcon = function (iconText){
            let $iconButton;
            let $icon = $('<i class="material-icons">');
            switch (iconText){
                case "customer":
                    $icon.html("account_circle");
                    break;
                case "cases":
                    $icon.html("assignment_ind");
                    break;
                case "treatments":
                    $icon.html("assignment");
                    break;
                default:
                    $icon = '<i class="material-icons">' + iconText + '</i>';
                    break;
            }
            $iconButton = $('<button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">')
                    .html($icon);
            $('<div class="mdl-card__menu">')
                .append($iconButton)
                .appendTo(this);
            return this;
        };
        return $item;
    }
}, {
    templatePath: "/component/departments/therapySession/therapySessionAnimalOverview/therapySessionAnimalOverview.html"
});