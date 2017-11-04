defineUI("test", function(bios, $element){
    "use strict";
    console.log("start test UI module");

    let resultText = "Test <br/>";
    let end = "<br/>";
    let i = 0;

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
            let result = bios.trans.userRole(i);
            resultText += fnName;
            resultText += (typeof result !== "string") ? "error on " + i + end : "success on " + i + " = " + result + end;
        }
    }

    $element
        .css("background-color", "yellow")
        .html(resultText);
});