/**
 * Created by Fry on 10.03.2018.
 */
defineComp("therapy-session-customer-data-view", function (bios, template, args) {
    "use strict";

    let $element = this.$ele;
    let department = "therapy-session";
    let comp = "therapySessionCustomerDataView";
    let id = 123;
    let type = "animal";

    addFunctions($element);

    bios.departments.load(department, comp, id, type);

    this.onLoad = function () {
        bios.departments.ready.subscribe(function(rxData){
            if (rxData.department === department && rxData.comp === comp){
                let customerData = bios.departments.therapySession.get.customerData();
                let $list = $('<ul class="list">')
                    .append($('<li class="owner fa fa-user">'))
                    .append($('<li class="animal fa fa-paw">'));
                for (let i = 0; i < customerData.owner.length; i++) {
                    $('<ul class="owner">').appendTo($('li.owner', $list));
                    let obj = customerData.owner[i];
                    for (let data in obj) {
                        $('ul.owner', $list).append($('<li>' + data + ': ' + obj[data] + '</li>'))
                    }
                }
                for (let i = 0; i < customerData.animal.length; i++) {
                    $('<ul class="animal">').appendTo($('li.animal', $list));
                    let obj = customerData.animal[i];
                    for (let data in obj) {
                        $('ul.animal', $list).append($('<li>' + data + ': ' + obj[data] + '</li>'))
                    }
                }
                $element.append($list);
            }
        });
    };

    function addFunctions($item) {
        $item.addList = (dataArray)=>{
            let $ul = $('<ul>');
            for (let i = 0; i < dataArray.length; i++) {
                let obj = dataArray[i];
                $('<li>')
                    .html(obj.content)
            }
            return this;
        };
        return $item;
    }

});