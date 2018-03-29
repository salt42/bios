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
    let customerData = {};
    let id;
    let type = "animal";
    let selection = bios.dataService.getMemory(SELECTION);
    this.model({
        owners: [],
        animals: [],
    });
    bios.AppState.onAppStateChanged.subscribe((rxData)=>{
        if(rxData.name === "therapy session treatment"){
            id = rxData.args.id;
            bios.departments.load(department, comp, id, type);
        }
    });


    this.onLoad = function () {
        bios.departments.ready.subscribe(function(rxData){
            if (rxData.department === department && rxData.comp === comp){
                let a = [];
                customerData = bios.departments.therapySession.get.customerData(id, type);
                a.push(customerData);
                Promise.all(a).then(function(){
                    self.data.owners = customerData.owner;
                    self.data.animals = customerData.animal;
                    selection.owner = customerData.owner[0].id;
                    selection.animal = customerData.animal[0].id;
                    bios.dataService.saveMemory(SELECTION, selection);
                });
            }
        });
    };

    function postProcessing(){
        let selectedClass = "selected fa fa-arrow-alt-circle-right";
        // console.log('a', customerData.owner && customerData.owner > 1 && selection.owner > -1);
        if(customerData.owner && customerData.owner.length > 1 && selection.owner > -1){
            $('li.cdv-owner', $element).removeClass(selectedClass);
            $('li.cdv-owner[data-id="' + selection.owner + '"]', $element).addClass(selectedClass);
        }
        if (customerData.animal && customerData.animal.length > 1 && selection.animal > -1){
            $('li.cdv-animal', $element).removeClass(selectedClass);
            $('li.cdv-animal[data-id="' + selection.animal + '"]', $element).addClass(selectedClass);
        }
    }

    this.clickAnimalAction = (item)=>{
        let rxFeed = {
            type: "customerDataView::selectedAnimal",
            data: item,
        };
        bios.departments.caseList(item.id);
        stream.next(rxFeed);
    };
    this.clickOwnerAction = (item)=>{
        let rxFeed = {
            type: "customerDataView::selectedOwner",
            data: item,
        };
        console.log(item, rxFeed)
        stream.next(rxFeed);
    };
    bios.pushService.events[SELECTION].subscribe(function (rxData) {
        if(rxData === "update"){
            selection = bios.dataService.getMemory(SELECTION);
            postProcessing();
        }
    });
}, {
    templatePath: "/component/departments/therapySession/therapySessionCustomerDataView/therapySessionCustomerDataView.html"
});