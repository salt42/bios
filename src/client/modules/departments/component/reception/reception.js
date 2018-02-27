/**
 * Created by Fry on 17.02.2018.
 */
defineComp("reception",  function (bios, template, args) {
    "use strict";

    let $element = this.$ele;

    this.onLoad = function(){
        $('p', $element).html(bios.trans.late("department::reception"));
    }

}, {
    templatePath: "/departments/component/reception/reception.html"
});