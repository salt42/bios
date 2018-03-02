/**
 * Created by Fry on 10.02.2018.
 */
defineComp("therapy-session-treatment",  function (bios, template, args) {
    "use strict";

    let $element = this.$ele;
    let dataService = bios.departments.therapySession;
    let get = dataService.get.treatment;


    //@todo define treatment object data design
    let treatmentData = get.treatmentData();

    let filterButtons = get.filterButtons();;
    let buttonBars = get.buttonBars();

    this.onLoad = function(){
        //@todo get treatmentData
        appendButton(filterButtons, $('.case', $element));
        appendButtonBar(buttonBars[0], $('.case', $element));
        prependData(treatmentData);

        $('button', $element).on("click", buttonActions);
        $("#delete-new-treatment").hover(()=>{
            _doHover('div.treatment.new');
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
            $('.old-treatments .treatment-data').remove();
            let filteredData = filterData(treatmentData, pressedButtonID);
            prependData(filteredData);
            markButton(pressedButton);
        }
        else if(pressedButtonType === "new") {
            // $('bar', $('div.wrapper[group="'+pressedButtonType+'"')).toggleClass("hidden");
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

    function filterData(data, by) {
        let res = [];
        if(by === "all" || by === "add") return data;
        for (let i = 0; i < data.length; i++) {
            if(data[i].type === by) res.push(data[i]);
        }
        if (res.length === 0) res = data;
        return res;
    }

    function prependData(data){
        $('.old-treatments').prependTemplate(".template-treatment",data, function (fragment, value) {
            if (value.type === "mail"){
                //insert mail
                $('.treatment', fragment).remove();
                $('p', fragment).text("Correspondence with owner");
                $('.treatment-mail', fragment).removeClass("hidden");
                $('.mail-text', fragment).html(value.text);
            } else {
                //insert treatment
                $('.treatment-mail', fragment).remove();
                $('p', fragment).text(value.diagnosis);
            }
            $('span.date', fragment).text(value.date);
        });
    }
    /*endregion*/

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