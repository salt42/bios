defineComp("link-bar", function (bios, template, args) {
    "use strict";

    // console.log('link bar', bios.Config.States);
    let $element = this.$ele;

    this.onLoad = function () {
        $('span.mdl-layout-title').html('BIOS nav');
        let navbar = $('nav.mdl-navigation');
        navbar.appendTemplate(".template-nav-link-url", bios.Config.States, function (navEntry, value) {
            $('a', navEntry)
                .attr("url", value.url)
                .html(value.name);
        });
    }

}, {
    templatePath: "/component/link/linkBar.html"
});