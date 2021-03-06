/**
 * Created by Fry on 10.02.2018.
 */
defineComp("therapy-session-overview",  function (bios, template, args) {
    "use strict";

    let $element = this.$ele;
    let self = this;
    let id = 1040;
    let type = "animal";
    // bios.appState.onAppStateChanged.subscribe()
    //console.log('#####',args);
    // // let id = args.id;
    // let department = "therapy-session";
    // let data = bios.departments.load(department, "overview", id).therapySession;
    // let cases = data.cases;
    // let customerData = data.customer;

    this.model({
        owner:{
            id: id,
            type: type,
            button: "edit owner"
        },
        case: {
            animalID: id,
            call: "call case",
            button: "new case"
        },
        treatment: {
            caseID: 1,
            call: "call treatment",
            button: "new treatment"
        }
    });

    this.onLoad = function(){
        bios.ems.departments.ts.stream.subscribe(function(rxData){
            if (rxData.type && rxData.type === "customerDataView::selectedAnimal"){
                self.data.case.animalID = rxData.data;
            }
            if (rxData.type && rxData.type === "caseList::selectedCase"){
                self.data.case.animalID = rxData.data;
            }
        });
    };

    this.onButtonClick = (data)=>{
        if(data === "edit owner"){
            //goto State Edit Owner
        }
        let parts = data.split(" ");
        if( parts[0] === "call"){

        }
        if( parts[0] === "new"){

        }
        console.log(parts);
    }
}, {
    templatePath: "/component/departments/therapySession/therapySessionAnimalOverview/therapySessionAnimalOverview.html"
});