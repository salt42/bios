/**
 * Created by fry on 10.11.2017.
 */
defineComp("article", function(bios, $element, args) {
    "use strict";
    $("<h1>article</h1>")
        .appendTo($element);

    let $form = $("<jsonForm></jsonForm>")
        .appendTo($element);

    bios.initAllUI($element);

    bios.search.findArticle(args.id, function(data) {
        console.log(data);
        $form.data("context").setData(data);
    });


    this.onDiscard = function() {};
});