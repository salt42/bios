/**
 * Created by Fry on 11.02.2018.
 */
define("userService", function(bios) {
    "use strict";

    let _activeUser = {};

    this.changeActiveUser = (id) => {
        if (_activeUser[id]) delete _activeUser[id]
        else _activeUser[id] = id;
    };

    this.getActiveUsers = () => {
        let result = [];
        for (let user in _activeUser) {
            result.push(user);
        }
        return result;
    };
});