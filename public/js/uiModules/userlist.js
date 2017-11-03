defineUI("userlist", function(bios, $element){
    "use strict";


    console.log("start search UI module");
    let $list = $('<ul></ul>');

    let $users = '<li>|_| Salt</li>\n' +
        '    <li>|_| Fry</li>\n';

    $users.appendTo($list);
    $list
        .addClass("userList")
        .appendTo($element);

    function getUserData(){}
    function getUserIcons(){
        DB.getIcons("user");
    }
});