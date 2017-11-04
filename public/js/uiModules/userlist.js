defineUI("userlist", function(bios, $element){
    "use strict";
    console.log("start userlist UI module");

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