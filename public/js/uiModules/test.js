defineUI("test", function(bios, $element){
    "use strict";
    if (window.startUpLogLevel >= 2) console.log("start test UI module");

    let resultText = "";
    let end = "<br/>";
    let i = 0;
    setTimeout(function() {

    if (false){
        let fnName = "bios.trans.gender" + ":   ";
        for (i=0; i < 2; i++){
            let result = bios.trans.gender(i);
            resultText += fnName;
            resultText += (typeof result !== "string") ? "error on " + i + end : "success on " + i + " = " + result + end;
        }
    }
    if (false){
        let fnName = "bios.trans.userRole" + ":   ";
        for (i=0; i < 4; i++){
            let result = bios.trans.decode.userRoles(i);
            resultText += fnName;
            resultText += (typeof result !== "string") ? "error on " + i + end : "success on " + i + " = " + result + end;
        }
    }
    if (true){
        let fnName = "bios.trans.species" + ":   ";
        for (i=0; i < 4; i++){
            let result = bios.trans.decode.species(i);
            resultText += fnName;
            resultText += (typeof result !== "string") ? "error on " + i + end : "success on " + i + " = " + result + end;
        }
    }

    if(resultText !== "")
        resultText = "Test <br/>" + resultText;
    $element
        .css("background-color", "yellow")
        .html(resultText);
    }, 1000)
});