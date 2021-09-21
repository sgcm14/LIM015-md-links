#!/usr/bin/env node
require('colors');
const { mdLinks } = require('./src/md-links.js');
const { stats, isBroken } = require('./src/cli-funciones.js');
const { messageError, messageWelcome } = require('./src/messages.js');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).option('validate', {
  //alias: 'v',
  type:'boolean',
  description: 'Hace petición HTTP para ver si el link funciona o no'
}).option('stats', {
  type:'boolean',
  description: 'Texto con estadísticas básicas sobre los links'
}).argv;

// VALIDACIONES:
// si el path es VACIO -> ''
// si el path es NULL -> null
// si el archivo NO existe -> readme2.md
// si el directorio NO existe -> ./pruebaDocs/carpeta/
// si el directorio tiene mas directorios -> './test/'
// si la ruta es absoluta -> 'C:/Users/Estudiante/Desktop/mdlinksprueba/test/files/pruebita1/pruebita2/leer5.md'
// si la ruta es relativa -> './test/files/pruebita1/pruebita2/leer5.md'

//------------------------------------------------------------API-------------------------------------------------------------------------
/*mdLinks('./pruebaDocs/', { validate: true }) //false o true
.then(resolve => {
  console.log(resolve);
}).catch(err => console.log(err .red)); */


//------------------------------------------------------------CLI-------------------------------------------------------------------------

const pathreceived = process.argv[2];
console.log(messageWelcome);

  if (argv.validate && !argv.stats)  {
  mdLinks(pathreceived, { validate: true }) //true
  .then(resolve => {
    resolve.map((objeto) => {
      console.log(`${objeto.file}  ${objeto.href.blue}  ${objeto.statusText.yellow}  ${objeto.status}  ${objeto.text.slice(0, 50).green}`);
    })
  }).catch(err => console.log(messageError.red, err.red));
} else if (argv.stats && !argv.validate) {
  mdLinks(pathreceived, { validate: false }) //no es necesario q sea true
  .then(resolve => {
    console.log(stats(resolve));
  }).catch(err => console.log(messageError.red, err.red));
}
else if (argv.validate && argv.stats) {
  mdLinks(pathreceived, { validate: true }) //true
  .then(resolve => {
    console.log(stats(resolve),isBroken(resolve));
  }).catch(err => console.log(messageError.red, err .red));
} else {
  mdLinks(pathreceived) //false
  .then(resolve => {
    resolve.map((objeto) => {
      console.log(`${objeto.file}  ${objeto.href.blue}  ${objeto.text.slice(0, 50).green}`);
    })
  }).catch(err => console.log(messageError.red, err.red));
}



/*
console.log(process.argv[0]); //node (length 1)
console.log(process.argv[1]); //mdlinks (length 2)
console.log(process.argv[2]); // path (length 3)
console.log(process.argv[3]); // validate  or stats (length 4)
console.log(process.argv[4]); // stats or validate(length 5)
console.log("*", process.argv.length);*/
