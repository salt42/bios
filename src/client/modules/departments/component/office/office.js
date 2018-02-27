defineComp("office",  function (bios, template, args) {
    "use strict";

    let $element = this.$ele;

    this.onLoad = function(){
        $('p', $element).html(bios.trans.late("department::office"));
    }

}, {
    templatePath: "/departments/component/office/office.html"
});