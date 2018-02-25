/**
 * Created by Fry on 10.02.2018.
 */
defineComp("therapy-session-treatment",  function (bios, template, args) {
    "use strict";

    let $element = this.$ele;

    this.onLoad = function(){
        let i = 0;
        // past treats
        $('.treatments').prependTemplate(".template-treatment",[{},{}], function (fragment, value) {
            //insert data
            $('p', fragment).text("old " + i++);
        });
        // actual new treat
        $('.treatments').prependTemplate(".template-treatment",[{}], function (fragment, value) {
            //insert data
            $(fragment).addClass("new");
            $('p', fragment).text("new");
        });
    }

}, {
    templatePath: "/component/departments/therapySession/therapySessionTreatment/therapySessionTreatment.html"
});