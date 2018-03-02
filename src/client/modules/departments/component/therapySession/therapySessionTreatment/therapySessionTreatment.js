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

    let filterButtons = get.buttons();
    let newButton = get.newButton();
    let buttonPairs = get.buttonPairs();

    this.onLoad = function(){
        //@todo get treatmentData
        addButton(filterButtons, $('.case', $element));
        addButtonBar(newButton[0], buttonPairs.newButton, $('.case', $element));
        prependData(treatmentData);

        //refresh by filter button
        $('button', $element).on("click", buttonActions)

    };

    /* region add Buttons */
    function addButton(buttonArray, to, additionalClass){
        to.appendTemplate(".template-case-button", buttonArray, function (fragment, value) {
           let button = $('button', fragment)
               .attr("id", value.id)
               .addClass(value.class)
               .attr("data-type", value.type)
               .html(value.text);
           if (additionalClass) button.addClass(additionalClass);
            for (let dataAttr in value.data) {
                button.attr( 'data-' + dataAttr, value.data[dataAttr]);
            }
        });
    }

    function addButtonBar(topButton, buttonPairs, to) {
        let obj = {
            topButton: topButton,
            buttonPairs: buttonPairs
        };
        to.appendTemplate(".template-button-bar", [obj], function (fragment, value) {
            // position the button bar
            $('.wrapper', fragment)
                .attr("group", value.topButton.id)
                .addClass("float-right");
            // modify the top-level button
            $('button',fragment)
                .html(value.topButton.text)
                .addClass(value.topButton.class);
            for (let attr in value.topButton.data) {
                $('button',fragment).attr("data-"+attr, value.topButton.data[attr]);
            }
            // add the switchable buttons
            $(".switchables-wrapper", fragment).appendTemplate(".template-button-pairs", value.buttonPairs, function (fragment,value){
                addButton([value.shown], $(fragment));
                if(value.hidden){
                    addButton([value.hidden], $(fragment));
                }
            });
        });
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
}, {
    templatePath: "/component/departments/therapySession/therapySessionTreatment/therapySessionTreatment.html"
});