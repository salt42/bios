defineComp("user-list", function(bios, $element){
    "use strict";
    if (window.startUpLogLevel >= 2) console.log("start user-list UI module");

    let $list = $('<ul></ul>');

    bios.search.userSearch(function(data){
        getUserList(data.users);
    });

    $list
        .addClass("userList")
        .appendTo($element);

    function getUserList(users){
        let $fragment  = $(document.createDocumentFragment());
        for (let i = 0; i < users.length; i++){
           $('<li></li>')
             .addClass('userEntry fa fa-user-md bios-icon-user-' + users[i].gender)
             .html(users[i].first_name + " " + users[i].name)
             .appendTo($fragment);
        }
        $fragment.appendTo($list);
    }
});