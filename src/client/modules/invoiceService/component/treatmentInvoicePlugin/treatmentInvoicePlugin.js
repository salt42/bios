defineComp("treatment-invoice-plugin", function (bios, template, args) {
    "use strict";

    // console.log('link bar', bios.Config.States);
    let $element = this.$ele;
    let id = ($element.data("id")) ? $element.data("id") : 0;
    let testData = [{
        articleID: 42,
        articleName: "Fliegen",
        amount: 42,
        factor: 2.4,
        basePrice: 3.00,
        tax: 0.19
    }];

    this.onLoad = function () {
        // add data ()=>{}
        $('tbody', $element).prependTemplate(".template-treatment-invoice-plugin-row", testData, setRow);
        addNewRow();
        // visualisation($('table', $element));

        // functionality
    };

    function setRow(fragment, value){
        let spN = value.basePrice * value.factor;
        let pN  = spN * value.amount;
        let pG  = pN * (1 + value.tax);
        $('td[data-type="article"]', fragment).html(value.articleName);
        $('td[data-type="amount"]', fragment).html(value.amount);
        $('td[data-type="factor"]', fragment).html(value.factor);
        $('td[data-type="single-price-net"]', fragment).html(spN);
        $('td[data-type="price-net"]', fragment).html(pN);
        $('td[data-type="tax"]', fragment).html(value.tax);
        $('td[data-type="price-gross"]', fragment).html(pG);
    }

    function addNewRow() {
        $('tbody', $element).appendTemplate(".template-treatment-invoice-plugin-new-row", testData, function(fragment, value){})
    }

    function visualisation (table) {
        let rows = $('tr:odd', table);
        for (let i = 0; i < rows.length; i++) {
            $(rows[i]).addClass("row-vis");
        }
    }
}, {
    templatePath: "/invoiceService/component/treatmentInvoicePlugin/treatmentInvoicePlugin.html"
});