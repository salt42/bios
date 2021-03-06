defineComp("user-list", function(bios, template){
    "use strict";

    let $element = this.$ele;

    this.onLoad = function () {
       $('.user-list-selector-name')
           .text( bios.trans.late("User") )
           .on("click", toggleList)
       ;

        bios.search.getList("user", setData);

    };
    function setData (users) {
        $('.user-list', $element).appendTemplate(".template-user-list-item", users, function (template, value){
            $('li', template).attr("data-user", value.id);
            $('span.name', template).text(value.first_name + " " + value.name);
            $('label.mdl-checkbox', template).attr("for", "checkbox-" + value.id);
            $('input', template).attr("id", "checkbox-" + value.id);
        });

        $('input', $element).on("click", toggleActiveUser);
    }

    function toggleList(e) {
        let switchElement = $('.user-list', $element)
            .toggleClass("hidden");
        if ( switchElement.hasClass("hidden") )
            switchElement.removeOuterClick();
        else
            switchElement.hidesOnOuterClick ( $('.user-list-selector') );
    }

    function toggleActiveUser(e){
        let $entry = $(e.target).parent().parent().parent();
        let uId = $entry.data("user");
        bios.userService.changeActiveUser(uId);
    }

        // let $fragment  = $(document.createDocumentFragment());
        //
        //
        // for (let i = 0; i < users.length; i++){
        //     let dataTag = "data-user='"+ users[i].id +"'";
        //    $('<li ' + dataTag + ' ></li>')
        //      .addClass('userlist-user-entry fa fa-user-md bios-icon-user-' + users[i].gender)
        //      .html(users[i].first_name + " " + users[i].name)
        //      .appendTo($fragment);
        // }
        // $fragment.appendTo($list);
}, {
    templatePath: "/component/userList/userList.html"
});