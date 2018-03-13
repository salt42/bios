/**
 * Created by Fry on 10.02.2018.
 */
defineComp("therapy-session-case",  function (bios, template, args) {
    "use strict";

    let $element = this.$ele;

    let department = "therapy-session";
    let comp = "therapySessionTreatment";
    let id = 123;
    let idType = "animal";
    bios.departments.load(department, comp, id , idType);

    let dataService;
    let get;

    //@todo define treatment object data design
    let treatmentData;
    let filterButtons;
    let buttonBars;

    this.onLoad = function(){
        bios.departments.ready.subscribe(function(rxData){
            if (rxData.department === department && rxData.comp === comp){
                dataService = bios.departments.therapySession;
                get = dataService.get.treatment;

                treatmentData = get.treatmentData();

                filterButtons = get.filterButtons();
                buttonBars = get.buttonBars();

                appendButtons(filterButtons, $('.case', $element));
                appendButtonBar(buttonBars[0], $('.case', $element));
                prependData(treatmentData.all, "all");
                $('button', $element).on("click", buttonActions);
                $('li', ".wrapper").on("click", subMenuAction);
                $("#delete-new-treatment").hover(()=>{
                    _doHover('div.treatment.new');
                });
            }
        });
        componentHandler.upgradeDom();
    };

    /* region add buttons */
    function appendButtons(buttonArray, $to, additionalClass){
        for (let i = 0; i < buttonArray.length; i++) {
            let obj = buttonArray[i];
            let $button = $('<button>')
                .addClass("mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect")
                .attr("id", obj.id)
                .addDataSet(obj.data)
                .html(obj.text)
                .appendTo($to);
            if (additionalClass) $button.addClass(additionalClass);
        }
    }

    function appendButtonBar(buttonBar, to) {
        buttonBar = (Array.isArray(buttonBar)) ? buttonBar : [buttonBar];
        to.appendTemplate(".template-button-bar", buttonBar, function (fragment, value) {
            // position and mark the button bar
            $('<button>')
                .attr ("id", value.wrapperID)
                .addClass("mdl-button mdl-js-button")
                .addClass("mdl-button--icon")
                .append('<i class="material-icons">more_vert</i>')
                .appendTo ( $('.wrapper', fragment) );
            let $ul = $('<ul>')
                .addClass("mdl-menu mdl-menu--bottom-left mdl-js-menu")
                .addClass("mdl-js-ripple-effect")
                .attr ("for", value.wrapperID)
                .appendTo( $('.wrapper', fragment) );

            for (let i = 0; i < value.buttonPairs.length; i++) {
                $('<li>')
                    .addClass("mdl-menu__item mdl-menu__item--full-bleed-divider")
                    .addClass(value.buttonPairs[i].shown.class)
                    .addDataSet(value.buttonPairs[i].shown.data)
                    .html (value.buttonPairs[i].shown.text)
                    .appendTo($ul);
                if(value.buttonPairs[i].hidden) {
                    $('<li>')
                        .addClass("mdl-menu__item mdl-menu__item--full-bleed-divider")
                        .addClass(value.buttonPairs[i].hidden.class)
                        .addDataSet(value.buttonPairs[i].hidden.data)
                        .html (value.buttonPairs[i].hidden.text)
                        .appendTo($ul);
                }
            }
        });
    }
    /*endregion*/
    /* region button actions */
    function subMenuAction(e) {
        let selection = $(e.target);
        let selectionID = selection.attr("id");
        let selectionType = selection.data("type");
        $('li', ".wrapper").has('[data-type="' + selectionType + '"]');
        console.log(selection);
        console.log(selectionID);
        console.log(selectionType);

    // else if(pressedButtonType === "new") {
    //         $('[data-type=new]')
    //             .toggleClass("fa-plus-square")
    //             .toggleClass("fa-minus-square");
    //         $('.show-on-click').toggleClass("hidden");
    //     }
    //     else if (pressedButtonType === "treatment") {
    //         if (pressedButtonID === "add") {
    //             addNewTreat();
    //         } else {
    //             $('.new-treatment').empty();
    //         }
    //         toggleButtonPair(pressedButton.data("pair"));
    //     } else {
    //         //mail
    //         toggleButtonPair(pressedButton.data("pair"));
    //     }
    }
    function buttonActions(e) {
        let selection = $('button').has(e.target);

        if(selection.data("type") === "filter"){
            $('.old-treatments').empty();
            prependData(treatmentData[selection.attr("id")], selection.attr("id"));
            markButton(selection);
        }
    }

    function toggleButtonPair(pairData){
        $('button[data-pair="'+ pairData +'"]', $element).toggleClass("hidden");
    }

    function markButton(selected) {
        $('button').removeClass("selected-filter");
        selected.addClass("selected-filter");
    }
    /*endregion*/

    function prependData(data, type){
        for ( let i = 0; i < data.length; i++){
            let comp = $('<therapy-session-single-treatment data-i="'+ i +'" data-type="'+ type +'">');
            $('.old-treatments').prepend(comp);
            bios.loadComponent(comp);
        }
    }

    function addNewTreat(){
        $('.new-treatment').prependTemplate(".template-treatment",[{}], function (fragment, value) {
            //insert data
            $('.treatment-mail', fragment).remove();
            $('.treatment', fragment).addClass("new");
            $('p', fragment).text("new");
            $('span.date', fragment).text(new Date());
        });
    }

    function _doHover(item){
        $(item).toggleClass("hover-new");
    }

    // /**
    //  *
    //  * @param (object) dataSet
    //  */
    // function addDataSet(dataSet, $to){
    //     for (let dataAttr in dataSet) {
    //         $to.attr('data-' + dataAttr, dataSet[dataAttr]);
    //     }
    // }
}, {
    templatePath: "/component/departments/therapySession/therapySessionTreatment/therapySessionTreatment.html"
});