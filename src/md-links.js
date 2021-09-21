const {pathResult, isPathValid, isFile, isFolder, statusLinks, fileRead, formatDirRead} = require('./api-funciones.js');

const mdLinks = (pathReceived, options) => {
  const promise = new Promise((resolve, reject) => {
    if (pathReceived) {
      pathResult(pathReceived); //la ruta del archivo
      let links = [];
      if(isPathValid(pathReceived)) {       
        if(isFolder(pathReceived)) { // si es directorio *
          links = formatDirRead(pathReceived); // el directorio leido
        } else if(isFile(pathReceived)) { // si es archivo *
          links = fileRead(pathReceived); // el archivo leido
        }
        if (options && options.validate === true) { //opciones de VALIDATE * TRUE
          statusLinks(links,(newLinks) => {
            resolve(newLinks);
          });
        } else {  //opciones de VALIDATE * FALSE
          resolve(links);
        }
        //resolve(links);
      } else {
        reject('La ruta del archivo o directorio no existe');
      }
    } else {
      reject('Ingrese la ruta del archivo o directorio');
    }
  });
  return promise;
}

module.exports = {  mdLinks };
