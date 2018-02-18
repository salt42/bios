/**
 * Created by Fry on 10.02.2018.
 */
defineComp("therapy-session",  function (bios, template, args) {
    "use strict";

    let $element = this.$ele;

    this.onLoad = function(){
        $('p#dash-info', $element).html(bios.trans.late("department::therapy session"));
    }

}, {
    templatePath: "/component/departments/therapySession/therapySession.html"
});