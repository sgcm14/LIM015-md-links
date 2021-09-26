const path = require('path');
const fs = require('fs');
const marked = require('marked');
const fetch = require('node-fetch');
const userPath = process.argv[2];

//examples of relative path and absolute path
const relativePath = "README.md";
const absolutePath ="C:\\Users\\Usuario\\Documents\\LABORATORIA\\LIM015-md-links\\README.md";

//To convert the path to absolute
const isAbsolute = path.isAbsolute(absolutePath)
//To validate is path is absolute and return if it is relative
const resolvePathA = (relativePath) => path.isAbsolute(relativePath) ? relativePath : path.resolve(relativePath)

//To access the file if it exists BOOLEAN
function pathExists(absolutePath) {
  return fs.existsSync(absolutePath);
}

//To detec if path is a file or not BOOLEAN
function findDirectory(absolutePath) {
  return fs.statSync(absolutePath).isDirectory();
};

//To read and find file and directory
const readFileandDirectory = (absolutePath) => {
  let newArray = []
  if(findDirectory(absolutePath)) {
    const arrayDirectory = fs.readdirSync(absolutePath)
    arrayDirectory.forEach((file) => {
      const joinArray = path.join(route, '/', file)
      console.log(joinArray)
      if(findDirectory(joinArray)) {
        newArray = newArray.concat(readFileandDirectory(joinArray))
      }else if (path.extname(joinArray) === '.md'){
        newArray.push(joinArray)
      }
    })
  }
  return newArray
}

//To extract the links
const extractTheLinks = (absolutePath) => {
  const arryLinks = []
  const regExFile = /\[(.*)\]( *)\(((((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n)]+)(?=\)))\)/gi
  const regExCorchetes = /\[(.*?)\]/gi
  const regExUrl = /(((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n)]+)(?=\))/gi
  readFileAndDirectory(absolutePath).forEach((file) => {
    const readFile = fs.readFileSync(file).toString()
    const matchFile = readFile.match(regExFile)
    if (matchFile != null) {
      for (let i = 0; i < matchFile.length; i++) {
        const tag = matchFile[i].match(regExCorchetes)[0].replace('[', '').replace(']', '')
        const url = matchFile[i].match(regExUrl)[0]
        const linkObj = {
          href: url,
          text: tag,
          file: route
        }
        arryLinks.push(linkObj)
      }
    }
  })
  return arryLinks
}
console.log(extractTheLinks(userPath))