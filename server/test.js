"use strict";

var img = `
                                  .'\\   /\`.
                                .'.-.\`-'.-.\`.
                           ..._:   .-. .-.   :_...
                         .'    '-.(o ) (o ).-'    \`.
                        :  _    _ _\`~(_)~\`_ _    _  :
                       :  /:   ' .-=_   _=-. \`   ;\\  :
                       :   :|-.._  '     \`  _..-|:   :
                        :   \`:| |\`:-:-.-:-:'| |:'   :
                         \`.   \`.| | | | | | |.'   .'
                           \`.   \`-:_| | |_:-'   .'
                             \`-._   \`\`\`\`    _.-'
                                 \`\`-------''`;

var colors = require('colors');
var log = require('./log')('main');
console.log(img);
log("Start Bios");
try {
    require('./config')(__dirname + "/../conf.json");
    var db = require('./database.js');
    console.log(db.getPets(10));
} catch(e) {
    log(e.message.red);
    console.log(e);
}
