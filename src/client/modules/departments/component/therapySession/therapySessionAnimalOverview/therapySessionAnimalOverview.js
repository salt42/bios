/**
 * Created by Fry on 10.02.2018.
 */
defineComp("therapy-session-animal-overview",  function (bios, template, args) {
    "use strict";

    let $element = this.$ele;
    let id = 123;
    // let id = args.id;
    let department = "therapy-session";
    let data = bios.departments.load(department, "overview", id).therapySession;
    let cases = data.cases;
    let customerData = data.customer;

    this.onLoad = function(){
        let div = $('<div></div>')
            .attr("data-owner", customerData.owner)
            .attr("data-animal", customerData.animal);
        for (let i = 0; i < customerData.owner.length; i++) {
            let obj = customerData.owner[i];
            let span = $('<span></span><br>')
                .html('owner: ' + obj)
                .attr("data-id", obj.id)
                .attr("data-type", "owner")
                .append($('<br>'));
            div.append(span);
        }
        for (let i = 0; i < customerData.animal.length; i++) {
            let obj = customerData.animal[i];
            let span = $('<span></span><br>')
                .html('animal: ' + obj)
                .attr("data-id", obj.id)
                .attr("data-type", "animal")
                .append($('<br>'));
            div.append(span);
        }
        $element.append(div);
        $element.append($('<br>'));

        let $cases = $('<div></div>');
        $element.append($cases);

    };
}, {
    templatePath: "/component/departments/therapySession/therapySessionAnimalOverview/therapySessionAnimalOverview.html"
});