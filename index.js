module.exports = () => {
  // ...
};

const fs = require('fs');

console.log('hola');
const md= fs.readFileSync('./pruebaDocs/leer.md','utf8');
console.log(`esto es md:\n`,md);

const txt= fs.readFileSync('./pruebaDocs/contenido.txt','utf8');
console.log(`esto es txt:\n`,txt);

const readme= fs.readFileSync('readme.md','utf8');
console.log(`esto es readme:\n`,readme);