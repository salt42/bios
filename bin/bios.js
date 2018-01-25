#!/usr/bin/env node --inspect
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
let fs = require("fs")
// require('../jsfair/devShell')(fs.realpathSync(__dirname + "/../"));


const path = require("path");


require("../jsfair/devShell")(path.realPathSync("./../conf.json"));
