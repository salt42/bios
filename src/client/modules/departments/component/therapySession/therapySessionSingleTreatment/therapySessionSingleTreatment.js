/**
 * Created by Fry on 10.02.2018.
 */
defineComp("therapy-session-single-treatment",  function (bios, template, args) {
    "use strict";

    let $element = this.$ele;
    let department = "therapy-session";
    bios.departments.load(department);
    let dataService = bios.departments.therapySession;
    let data = dataService.get.treatment.treatmentData()[$element.data("type")][$element.data("i")];

    this.onLoad = function(){
        $element.appendTemplate(".template-treatment-" + data.type, [data], function (fragment, value) {
            $('.date', $element).html(value.date);
            if (data.type === "treatment"){
                $('textarea.diagnosis', fragment).html(value.diagnosis);
            } else {  //mail
                $('.mail-text', fragment).html(value.text);
            }
        });
    };
}, {
    templatePath: "/component/departments/therapySession/therapySessionSingleTreatment/therapySessionSingleTreatment.html"
});