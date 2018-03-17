/**
 * Created by Fry on 17.03.2018.
 */
defineComp("therapy-session-case-list", function (bios, template, args) {
    "use strict";
    let $element = this.$ele;
    let self = this;
    let stream = bios.ems.departments.ts.stream;
    let department = "therapy-session";
    let comp = "therapySessionCaseList";

    this.data.list = caseListDummy(5);

    function caseListDummy (count){
        let res = [];
        for (let i = 0; i < count; i++) {
            res.push({
                id: i,
                description: "case " + i
            })
        }
        return res;
    }

    this.onLoad = function () {
        $('.cl-item', $element).on("click", clickAction)
    };
    this.onItemClick = function (item) {
        stream.next({
            type: "caseList::selectedCase",
            data: item,
        });
    };
    function clickAction(e){
    }

}, {
    templatePath: "/component/departments/therapySession/therapySessionCaseList/therapySessionCaseList.html"
});