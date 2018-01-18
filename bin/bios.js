#!/usr/bin/env node --use_strict
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

console.log(img);
let projectPath = require("fs").realpathSync(__dirname + "/../");
require('../jsfair/main.js')(projectPath);