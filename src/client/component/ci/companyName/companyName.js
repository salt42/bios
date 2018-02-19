defineComp("company-name", function(bios, $element, args) {
    "use strict";

    this.onLoad = function () {
        $('c-name p').html(bios.settings.company.name);
        $('c-data p.line-one').html(bios.settings.company.lineOne);
        $('c-data p.line-two').html(bios.settings.company.lineTwo);
        $('c-data p.line-three').html(bios.settings.company.lineThree);
        $('c-data p.line-four').html(bios.settings.company.lineFour);
    };

}, {
    templatePath:"/component/ci/companyName/companyName.html"
});