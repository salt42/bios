defineComp("company-logo", function(bios, template, args) {
    "use strict";

    this.onLoad = function(){
        $('img.company-logo').attr("src", bios.settings.companyLogo);
    };

}, {
    templatePath: "/component/ci/companyLogo/companyLogo.html"
});