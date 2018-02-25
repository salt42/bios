/**
 * Created by Fry on 10.02.2018.
 */
defineComp("therapy-session-treatment",  function (bios, template, args) {
    "use strict";

    let $element = this.$ele;


    let treatmentData = [
        {
            type: "treatment",
            diagnosis: "oldest"
        },{
            type: "mail",
            text: "kjahskjdhjashjks"
        },{
            type: "treatment",
            diagnosis: "older"
        },{
            type: "treatment",
            diagnosis: "old"
        },
    ];

    let filterButtons = [{
            id: "mail",
            text: "only mails"
        },{
            id: "treatment",
            text: "only treatments"
        },{
            id: "all",
            text: "all"
        },
    ];
    let newTreatButton = [
        {
            id: "add",
            text: "new",
            class: "toggle-pair far fa-plus-square",
        },
        {
            id: "delete-new",
            text: "delete new",
            class: "toggle-pair hidden fas fa-exclamation-triangle",
        }
    ];

    this.onLoad = function(){
        //@todo get treatmentData
        // past treats
        addCaseButton(filterButtons);
        addCaseButton(newTreatButton);
        prependData(treatmentData);

        //refresh by filter button
        $('button', $element).on("click", buttonActions)

    };

    function addNewTreat(){
        $('.new-treatment').prependTemplate(".template-treatment",[{}], function (fragment, value) {
            //insert data
            $('.treatment-mail', fragment).remove();
            $('.treatment', fragment).addClass("new");
            $('p', fragment).text("new");
        });
        toggleNewButton();
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
        });
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

    function buttonActions(e) {
        let pressedButton = $(e.target).attr("id");
        if (pressedButton === "add") {
            addNewTreat();
        } else if (pressedButton === "delete-new") {
            $('.new-treatment').empty();
            toggleNewButton();
        } else {
            $('.old-treatments .treatment-data').remove();
            let filteredData = filterData(treatmentData, pressedButton);
            prependData(filteredData);
        }
    }

    function addCaseButton(buttonArray){
        $('.case', $element).appendTemplate(".template-case-button", buttonArray, function (fragment, value) {
           $('button', fragment)
               .attr("id", value.id)
               .addClass(value.class)
               .html(value.text);
        });
    }
    function toggleNewButton(){
        $('.toggle-pair', $element).toggleClass("hidden");
    }

}, {
    templatePath: "/component/departments/therapySession/therapySessionTreatment/therapySessionTreatment.html"
});