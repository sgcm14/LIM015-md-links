const path = require('path');
const fs = require('fs');
const { link } = require('fs/promises');
const userPath = process.argv[2];


//To convert the path to absolute
const tobeAbsolute = (userPath) =>path.isAbsolute(userPath)
//console.log(tobeAbsolute(userPath))
//To validate is path is absolute and return if it is relative
const resolvePathA = (route) => path.isAbsolute(route) ? route : path.resolve(route)

//To access the file if it exists BOOLEAN
function pathExists(userPath) {
  return fs.existsSync(userPath)
}

//To detec if path is a file or not BOOLEAN
function findDirectory(userPath) {
  return fs.statSync(userPath).isDirectory()
}

//To read and find file and directory
const readFileAndDirectory = (userPath) => {
  let newArray = []
  if(findDirectory(userPath)) {
    const arrayDirectory = fs.readdirSync(userPath)
    arrayDirectory.forEach((file) => {
      const joinArray = path.join(userPath, '/', file)
      //console.log(joinArray)
      if(findDirectory(joinArray)) {
        newArray = newArray.concat(readFileAndDirectory(joinArray))
      }else if (path.extname(joinArray) === '.md'){
        newArray.push(joinArray)
      }
    })
  }
  return newArray
}
//console.log(readFileAndDirectory(userPath))

//To extract the links
const extractTheLinks = (userPath) => {
  const arrayLinks = []
  const regExFile = /\[(.*)\]( *)\(((((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n)]+)(?=\)))\)/gi
  const regExCorchetes = /\[(.*?)\]/gi
  const regExUrl = /(((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n)]+)(?=\))/gi
  readFileAndDirectory(userPath).forEach((file) => {
    const readFile = fs.readFileSync(file).toString()
    const matchFile = readFile.match(regExFile)
    if (matchFile != null) {
      for (let i = 0; i < matchFile.length; i++) {
        const text = matchFile[i].match(regExCorchetes)[0].replace('[', '').replace(']', '')
        const href = matchFile[i].match(regExUrl)[0]
        const linkObj = {
          href,
          text,
          file
        }
        arrayLinks.push(linkObj)
      }
    }
  })
  return arrayLinks
}
//console.log(extractTheLinks(userPath))
//C:\\Users\\Usuario\\Documents\\LABORATORIA\\LIM015-md-links\\src
//To validate the options
const confirmOptions = (links) => {
  const statusLinks = links.map((element) => //it will return me a neww array
  fetch(element.href)
  .then(response => { //this content the code of status answer
    if((response.status >= 200) && (response.status <= 399)){
      return{
        href: element.href,
        text: (element.text.substring(0, 50)),
        path: element.file,
        status: response.status,
        statusText: 'OK'
      }
    } else if((response.status < 200) || (response.status >= 400)) {
      return{
        href: element.href,
        text: (element.text.substring(0, 50)),
        path: element.file,
        status: response.status,
        statusText: 'Fail'
      }
  }})
  .catch((err) => {
    return{
      href: element.href,
      text: (element.text.substring(0, 50)),
      path: element.file,
      status: 'There was a problem with the Fetch request. ' + err,
      statusText: 'Fail'
    }
  })
  )
  return Promise.all(statusLinks)
}
console.log(confirmOptions(userPath))

module.exports = {
  tobeAbsolute,
  resolvePathA,
  pathExists,
  findDirectory,
  readFileAndDirectory,
  extractTheLinks,
  confirmOptions,
};