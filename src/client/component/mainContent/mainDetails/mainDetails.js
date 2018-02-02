defineComp("main-details", function(bios, $element, args) {
    "use strict";
    let self = this;
    let callerType = (args.type) ? args.type : null;
    let callerID   = (args.id)   ? parseInt(args.id, 10) : null;

    let mode = chooseMode(callerType);
    let dbData;

    let name = "name";
    let info = "info";

    let animals = [];
    let owners = [];
    let treatments = [];
    let articles = [];
//las mich des mal anschauen
    /* region functions */
    function chooseMode(callingType){
        if (callingType === "animal" || callingType === "owner" || callingType === "treatment")
            return "mode 1";
        if (callingType === "article")
            return "mode 2";
        return "dashboard";
    }
    function updateBla(data) {
        dbData = data;
        console.log(dbData);
        // setDBData(data);// solte er eigentlich ran kommen aber callbacks sind manchmal bisal zickig
    }
    function getData(mode, type, id, callback){
        console.log(this)
        if (mode !== "dashboard"){
            bios.search.mainDetails(type, id, callback );
        } else {
            // call dashboard
        }
    }
    function setDBData(data){
        dbData = data;
    }

    function createFCObject(type, id, name, info, selected = false){
        return {
            type: type,
            id: id,
            top:{
                name: name,
                info: info
            },
            selected: selected,
        };
    }

    function prepareObject(type, id, name, info, selected = false){
        switch(type){
            case 'animal':
                animals.push(createFCObject(type, id, name, info, selected));
                break;
            case 'owner':
                owners.push(createFCObject(type, id, name, info, selected));
                break;
            case 'treatment':
                treatments.push(createFCObject(type, id, name, info, selected));
                break;
            case 'article':
                articles.push(createFCObject(type, id, name, info, selected));
                break;
            default:
            //get dashboard
        }
    }

    function saveData(objectArray) {
        for (let i = 0; i < objectArray.length; i++){
            bios.dataService.save("fcData", objectArray[i]);
        }
    }
    /*endregion*/

    // push the caller object
    prepareObject(callerType, callerID, name, info, true);

    getData(mode, callerType, callerID, (d) => {
        //daten zwischen comps giebt es eigentlich nicht es solte nur einstellungen geben und die daten soll sich jede comp selber hollen
        // oh mann das hatten wir doch gestern^^ der hier ruft die animals,js für jedes tier auf, die braucht dafür aber ne id
        //ja aber auch erstmal nur die id und die kannst du der comp als html attr geben...  aber ich möchte ein array mit ids und typ übergeben
        // was is die subcomp?  die zeigt was an ja
        console.log('level 1 ', dbData);//oder
    });
let $a;
    this.onLoad = () => {
        //in der onload sind dann auch die subcomps geladen und hier kannst du ja einfach die comp ansprechen
        $a.getComponent().set(data); //das hier wieder besser macht^^ ich bastel mal um, muss kurz afk und den lappi zuklappen, ben ins bett und selber hoch
        // melde mich, wenn ich was neues hab^^ kkdanke schonmal
    };
    // ok dann denk ich nochmal alles durch  wird die details comp geladen wärend die anfrage an den server fliegt oder erst wenn die daten zurück kommen?
    // na bisher standen die daten drin^^
    // aber die frage is nicht plöd weil des macht nen kleinen unterschied, wenn du die comp direct nach dem absenden der anfrage an den server geladen wird dann sind die daten
    // das unterhalb hier ist noch nicht fertig... also auf gut deutsch in funcs packen und nacheinander aufrufen innerhalb des callbacks
    //was nacheinander?
//func1
    if (mode === "mode 1"){
        let objects = owners.concat(animals, treatments);
        saveData(objects);
        $a = $("<mc-flashcard></mc-flashcard>");//hier unter umständen noch nicht da... oder eigentlich sicher noch nicht da was
        $a.appendTo($element);
    }
    else if(mode === "mode 2"){
        let objects = [];
        // call article flashcards
    } else {
        // call dashboard
    }

// func2 usw


    // additional test data
    callerID++;
    name += " "+callerID;
    info += " "+callerID;

    bios.dataService.save("fcData", createFCObject(callerType, callerID, name, info));
});