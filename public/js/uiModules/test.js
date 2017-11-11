defineUI("test", function(bios, $element){
    "use strict";
    if (window.startUpLogLevel >= 2) console.log("start test UI module");

    let resultText = "";
    let end = "<br/>";
    let i = 0;
    setTimeout(function() {

    if (true){
        resultText += "bios.trans.gender" + ":" + end;
        for (i=0; i < 2; i++){
            let result = bios.trans.enum.gender(i);
            resultText += (typeof result !== "string") ? "ERROR on " + i + end : "success on " + i + " = " + result + end;
        }
        resultText += end;
    }
    if (true){
        resultText += "bios.trans.userRole" + ":" + end;
        for (i=1; i < 4; i++){
            let result = bios.trans.decode.userRoles(i);
            resultText += (typeof result !== "string") ? "ERROR on " + i + end : "success on " + i + " = " + result + end;
        }
        resultText += end;
    }
    if (true){
        resultText += "bios.trans.species" + ":" + end;
        for (i=1; i < 4; i++){
            let result = bios.trans.decode.species(i);
            resultText += (typeof result !== "string") ? "ERROR on " + i + end : "success on " + i + " = " + result + end;
        }
        resultText += end;
    }

    if(resultText !== "")
        resultText = "Test <br/> <br/>" + resultText;
    $element
        .css("background-color", "yellow")
        .css("position","absolute")
        .css("top", "70px")
        .css("left", "400px")
        .css("padding", "10px")
        .html(resultText);
    }, 1000)
});