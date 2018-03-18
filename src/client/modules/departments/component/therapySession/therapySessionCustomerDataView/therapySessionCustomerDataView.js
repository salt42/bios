/**
 * Created by Fry on 10.03.2018.
 */
defineComp("therapy-session-customer-data-view", function (bios, template, args) {
    "use strict";

    const SELECTION = "tsOverviewSelections";
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
    let selection = bios.dataService.getMemory(SELECTION);
    bios.pushService.events[SELECTION].subscribe(function (rxData) {
        if(rxData === "update"){
            selection = bios.dataService.getMemory(SELECTION);
            postProcessing();
        }
    });
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
                selection.owner = customerData.owner[0].id;
                selection.animal = customerData.animal[0].id;
                bios.dataService.saveMemory(SELECTION, selection);
            }
        });
    };

    function postProcessing(){
        if(self.data.owners && self.data.owners.length > 1 && selection.owner > -1){
            $('li.cdv-owner', $element).removeClass("selected");
            $('li.cdv-owner[data-id="' + selection.owner + '"]', $element).addClass("selected");
        }
        if (self.data.animal && self.data.animals.length > 1 && selection.animal > -1){
            $('li.cdv-animal', $element).removeClass("selected");
            $('li.cdv-animal[data-id="' + selection.animal + '"]', $element).addClass("selected");
        }
    }

    this.clickAnimalAction = (item)=>{
        let rxFeed = {
            type: "customerDataView::selectedAnimal",
            data: item,
        };
        bios.departments.caseList(item.id);
    };
    this.clickOwnerAction = (item)=>{
        let rxFeed = {
            type: "customerDataView::selectedOwner",
            data: item,
        };
        bios.departments.caseList(item.id);
    };
    function clickAction (rxFeed){
        stream.next(rxFeed);
        postProcessing();
    }
}, {
    templatePath: "/component/departments/therapySession/therapySessionCustomerDataView/therapySessionCustomerDataView.html"
});