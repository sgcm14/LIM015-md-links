const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it'),
md = new MarkdownIt();
require('colors');
const fetch = require('node-fetch');

// console.log(path.dirname(pathReceived)); // te devuelve el directorio
// console.log(path.basename(pathReceived)); // te devuelve el nombre del archivo

// me devuelve la ruta
const pathResult = (pathReceived) => {
  // const result = path.normalize(pathReceived);
  return path.resolve(pathReceived);
}

// si la ruta es absoluta o relativa
const pathAbsolute = (pathReceived) => {
  // const result = path.normalize(pathReceived);
  return path.isAbsolute(pathReceived);
}

// convierte md en html
const renderMdtoHTML = (content) => {
  const render = md.render(content);
  return render;
}

// es .md
const fileMd = (pathReceived) => {
  const md = path.extname(pathReceived);
  return md === '.md';
}

// valida si la ruta existe
const validatePath = (pathReceived) => {
  try {
    if (fs.existsSync(pathReceived)) {
      return true;
    }
  } catch (error) {
    return false;
  }
}

// si es archivo
const isFile = (pathReceived) => {
  try {
    if (fs.statSync(pathReceived).isFile()) {
      return true;
    }
  } catch (error) {
    return false;
  }
}

// si es directorio
const isFolder = (pathReceived) => {
  try {
    // let isDirExists = fs.existsSync(pathReceived) && fs.lstatSync(dirPath).isDirectory();
    if (fs.statSync(pathReceived).isDirectory()) {
      return true;
    } 
  } catch (error) {
    return false;
  }
}

// valida el Link
const checkLink = (link, callback) => {
  fetch(link)
    .then(sLinks => {
      let obj = {
        href: link.href, //destructuracion para los nombres
        text: link.text,
        file: link.file,
        status: sLinks.status, // status 500
        statusText: sLinks.statusText // 
      };
      callback(obj);
    }).catch(err => {
      //console.log(err); // HAY QUE MANEJAR Q OCURRE CUANDO NO ENTRA Aqui
      let obj = {
        href: link.href,
        text: link.text,
        file: link.file,
        status: 500,
        statusText: 'FAIL'
      };
      callback(obj);
    });
}

const statusLinks = (links, callback) =>{
  let newLinks = [];
  let j = 0;
  links.forEach(element => {
    //console.log(checkLink(e, newLink => {newLink}));
    checkLink(element, (newLink) => {
      j++;
      //console.log('j='+j);
      newLinks.push(newLink);
      if(links.length === j) {
        callback(newLinks);
      }
    });  
  });  
}

// lee el archivo
const fileRead = (pathReceived) => {
  let links = [];
  if (fileMd(pathReceived)){
    const file = fs.readFileSync(pathReceived, 'utf8');
    const fileParse = renderMdtoHTML(file);
    const regExp = /(<a [^>]*(href="([^>^\"]*)")[^>]*>)([^<]+)(<\/a>)/gi;
    let result;
    if(!pathAbsolute(pathReceived)){
      pathReceived = pathResult(pathReceived).replace(/\\/g,'/');
    } else {
      pathReceived = pathReceived.replace(/\\/g,'/');
    }
    
    while((result = regExp.exec(fileParse)) !== null) {
      // console.log(result);
      let obj = {
        href: result[0,3],
        text: result[0,4],
        file: pathReceived
      }
      links.push(obj);
    }
  }
  return links;
}

// lee el directorio
const dirRead = (pathReceived) => {
  const dir = fs.readdirSync(pathReceived);
  let links = [];
  // recorrer dir con for each (if archivo => new path a fileREad(newPath) = array links push retorne links
  // if directorio => new path2 a fileRead(newPath2) = array retorne links
  //[ 'contenido.txt', 'leer.md', 'leer2.md', 'pruebita', 'vacio.md' ]
  dir.forEach((value) => {
    let newPath = pathReceived+value;
    if (isFile(newPath)) {
      const objLinks = fileRead(newPath);
      if (objLinks.length>0){
        links.push(objLinks);
      }
    } else {
        newPath = newPath + '/';
      if(isFolder(newPath)) {
        //newPath = './pruebaDocs/pruebita/'
        const folderLinks = dirRead(newPath);
        //console.log(folderLinks);
        if(folderLinks.length > 0) {
          folderLinks.forEach((element) => links.push(element));
        }
      }
    }
  });
  return links;
}

// Une todos los directorios en un array
const formatDirRead = (pathReceived) => {
  let links = [];
  /*
   * linksDir = [
   *    [{linksfolder1_1}],[{linksfolder1_2}],[{linksfolder2_1}]
   * ] => [{linksfolder1_1},{linksfolder1_2},{linksfolder2_1}]
   */
  const linksDir = dirRead(pathReceived);
  //links = linksDir.flat();
  linksDir.forEach(element => {
    element.forEach(e => {
      links.push(e);
    });
  });
  return links;
  //console.log(links);
}

const mdLinks = (pathReceived, options) => {
  const promise = new Promise((resolve, reject) => {
    if (pathReceived) {
      pathResult(pathReceived); //la ruta del archivo
      let links = [];
      if(validatePath(pathReceived)) {       
        if(isFolder(pathReceived)) { // si es directorio *
          links = formatDirRead(pathReceived); // el directorio leido
        } else if(isFile(pathReceived)) { // si es archivo *
          links = fileRead(pathReceived); // el archivo leido
        }
        if (options && options.validate === true) { //opciones de VALIDATE *
          //console.log('options.validate true = '+options.validate);
          statusLinks(links,(newLinks) => {
            resolve(newLinks);            
          });
        } else {
          //console.log('options.validate false');
          resolve(links);
        }
        //resolve(links);
      } else {
        reject('La ruta del archivo o directorio no existe'.red);
      }
    } else {
      reject('Ingrese la ruta del archivo o directorio'.red);
    }
  });
  return promise;
}

module.exports = {mdLinks}
