defineComp("main-details", function(bios, $element, args) {
    "use strict";

    let type = (args.type) ? args.type : null;
    let id   = (args.id)   ? args.id   : null;
    console.log(type);

    let callFlashcards = [
        "animal" , "owner", "treatment"
    ];

    switch(type){
        case 'animal':
        case 'owner':
        case 'treatment':
            // makeUp data for flashcard
            let id2 = id++;
            let fcData = [
                {
                    top: {
                        name: type,
                        info: type + "-o-mat " + id,
                    },
                    content: {
                        id: id,
                    },
                    type: type,
                    selected: true,
                },
                {
                    top: {
                        name: type,
                        info: type + "-o-mat " + id2,
                    },
                    content: {
                        id: id2,
                    },
                    type: type,
                },
            ];

            let $flashcard = $("<mc-flashcard></mc-flashcard>")
                .appendTo($element)
                .getComponent();
            // transfer data to flashcards
            bios.transferData = {};
            bios.transferData.fc = fcData;
            break;
        case 'article':
            break;
        default:
            //get dashboard
    }
});