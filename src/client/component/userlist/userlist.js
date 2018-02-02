defineComp("user-list", function(bios, $element){
    "use strict";
    if (window.startUpLogLevel >= 2) console.log("start user-list UI module");

    let $list = $('<ul></ul>');

    bios.search.getList("user", function(data){
        getUserList(data);
    });

    $list
        .addClass("userList")
        .appendTo($element);

    function getUserList(users){
        let $fragment  = $(document.createDocumentFragment());
        for (let i = 0; i < users.length; i++){
            let dataTag = "data-user='"+ users[i].id +"'";
           $('<li ' + dataTag + ' ></li>')
             .addClass('userlist-user-entry fa fa-user-md bios-icon-user-' + users[i].gender)
             .html(users[i].first_name + " " + users[i].name)
             .appendTo($fragment);
        }
        $fragment.appendTo($list);
    }

    $("li.userlist-user-entry").on("click", (e)=>{
        let uId = e.target.dataSet.user;
        bios.dataService.setActiveUser(uId);
    });
});