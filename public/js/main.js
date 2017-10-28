(function() {
    "use strict";
    window.FormBuilder = {};
    FormBuilder.render = function (formDef, data = null) {
        let res = "<div>";
        res += FormBuilder.renderElements(formDef, data);
        res += "</div>";
        return res;
    };
    FormBuilder.renderElement = function (def, name, data = null, withLabel = true) {
        if (typeof def !== "object") {
            console.error("def is not a object");
            return "";
        }
        if (!def.type) {
            console.error("def has no type property");
            return "";
        }
        let funcName = "renderElement_" + def.type.toLowerCase(),
            res = "";

        if (FormBuilder.hasOwnProperty(funcName)) {
            res += FormBuilder[funcName](def, name, data);
        }
        return (withLabel)? FormBuilder.renderLabel(def.label || " - ", res): res;
    };
    FormBuilder.renderElements = function (def, data = null) {
        if (typeof def !== "object") {
            console.error("formDef is not a object");
            return;
        }
        let res = '';
        for(let key in def) {
            if (!def.hasOwnProperty(key)) continue;
            if (!def[key].type) continue;
            let eleData = null;
            if (data != null && typeof data === "object" && data.hasOwnProperty(key)) eleData = data[key];
            res += FormBuilder.renderElement(def[key], key, eleData);
        }
        return res;
    };
    FormBuilder.renderLabel = function (label, element) {
        return `<label><span>${label}</span>${element}</label>`;
    };
    FormBuilder.renderElement_select = function (selectDef, name, value = null) {
        value = value || selectDef.value || "";
        let options = "";
        for(let i = 0; i < selectDef['options'].length; i++) {
            options += `<option value="${selectDef['options'][i]}">${selectDef['options'][i]}</option>\n`;
        }
        return `<select name="${name}" value="${value}">
                    ${options}
                </select>`;
    };
    FormBuilder.renderElement_text = function (def, name, value = null) {
        value = value || def.value || "";
        return `<p name="${name}">${value}</p>`;
    };
    FormBuilder.renderElement_textarea = function (def, name, value = null) {
        value = value || def.value || "";
        return `<textarea name="${name}" rows="${def.rows || 3}" cols="${def.cols || 10}">${value}</textarea>`;
    };
    FormBuilder.renderElement_input = function (def, name, value = null) {
        value = value || def.value || "";
        return `<input name="${name}" type="${def.subType || "text"}" value="${value}">`;
    };
})();
//core
(function(global) {
    "use strict";

    //onLoad
    $(function() {
        //init
    });
})({});