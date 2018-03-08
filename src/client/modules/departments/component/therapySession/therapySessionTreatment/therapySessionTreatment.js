/**
 * Created by Fry on 10.02.2018.
 */
defineComp("therapy-session-treatment",  function (bios, template, args) {
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

                appendButton(filterButtons, $('.case', $element));
                appendButtonBar(buttonBars[0], $('.case', $element));
                prependData(treatmentData.all, "all");
                $('button', $element).on("click", buttonActions);
                $("#delete-new-treatment").hover(()=>{
                    _doHover('div.treatment.new');
                });
            }
        });
    };

    /* region add buttons */
    function appendButton(buttonArray, to, additionalClass){
        to.appendTemplate(".template-case-button", buttonArray, function (fragment, value) {
            _buttonAdd(fragment, value, additionalClass);
        });
    }
    function prependButton(buttonArray, to, additionalClass){
        to.prependTemplate(".template-case-button", buttonArray, function (fragment, value) {
            _buttonAdd(fragment, value, additionalClass);
        });
    }

    function appendButtonBar(buttonBar, to) {
        buttonBar = (Array.isArray(buttonBar)) ? buttonBar : [buttonBar];
        to.appendTemplate(".template-button-bar", buttonBar, function (fragment, value) {
            // position and mark the button bar
            $('.wrapper', fragment).attr("group", value.wrapperID);
            // prepend top-level button
            prependButton([value.topButton], $('.wrapper', fragment));
            // append switchable buttons
            $(".switchables-wrapper", fragment).appendTemplate(".template-button-pairs", value.buttonPairs, function (fragment,value){
                appendButton([value.shown], $(fragment));
                if(value.hidden) appendButton([value.hidden], $(fragment));
            });
        });
    }

    function _buttonAdd(fragment, value, additionalClass){
        let button = $('button', fragment)
            .attr("id", value.id)
            .html(value.text);
        if (value.class) button.addClass(value.class);
        if (additionalClass) button.addClass(additionalClass);
        for (let dataAttr in value.data)
            button.attr( 'data-' + dataAttr, value.data[dataAttr]);
    }
    /*endregion*/
    /* region button actions */
    function buttonActions(e) {
        let pressedButton = $(e.target);
        let pressedButtonID = pressedButton.attr("id");
        let pressedButtonType = pressedButton.data("type");

        if(pressedButtonType === "filter"){
            $('.old-treatments').empty();
            prependData(treatmentData[pressedButtonID], pressedButtonID);
            markButton(pressedButton);
        }
        else if(pressedButtonType === "new") {
            $('[data-type=new]')
                .toggleClass("fa-plus-square")
                .toggleClass("fa-minus-square");
            $('.show-on-click').toggleClass("hidden");
        }
        else if (pressedButtonType === "treatment") {
            if (pressedButtonID === "add") {
                addNewTreat();
            } else {
                $('.new-treatment').empty();
            }
            toggleButtonPair(pressedButton.data("pair"));
        } else {
            //mail
            toggleButtonPair(pressedButton.data("pair"));
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
}, {
    templatePath: "/component/departments/therapySession/therapySessionTreatment/therapySessionTreatment.html"
});