/**
 * Created by salt on 28.10.2017.
 */
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
    require('./config')(__dirname + "/conf.json");
    require('./express.js');
} catch(e) {
    log(e.message.red);
    console.log(e);
}
