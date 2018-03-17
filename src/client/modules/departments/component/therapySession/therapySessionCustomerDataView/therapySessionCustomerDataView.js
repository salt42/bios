/**
 * Created by Fry on 10.03.2018.
 */
defineComp("therapy-session-customer-data-view", function (bios, template, args) {
    "use strict";

    let $element = this.$ele;
    let self = this;
    let department = "therapy-session";
    let comp = "therapySessionCustomerDataView";
    let stream = bios.ems.departments.ts.stream;
    // console.log($element);
    // let id = $element.data("id");
    // let type = $element.data("type");
    let id = 123;
    let type = "animal";
    this.model({
        owners: [],
        animals: [],
    });

    bios.departments.load(department, comp, id, type);

    this.onLoad = function () {
        bios.departments.ready.subscribe(function(rxData){
            if (rxData.department === department && rxData.comp === comp){
                let customerData = bios.departments.therapySession.get.customerData();
                self.data.owners = customerData.owner;
                self.data.animals = customerData.animal;
                // console.log(customerData.owner);
                // console.log(customerData.animal);

                $('.cdv-animal').on("click", clickAction);
            }
        });
    };

    function clickAction(e) {
        stream.next({
            type: "customerDataView::selectedAnimal",
            data: $(e.target).data("id"),
        });
    }
}, {
    templatePath: "/component/departments/therapySession/therapySessionCustomerDataView/therapySessionCustomerDataView.html"
});