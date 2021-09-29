const path = require('path')
const fs = require('fs')
// const route = process.argv[2]
const fetch = require('node-fetch')
const marked = require('marked')

// To convert the path to absolute
const tobeAbsolute = (route) => path.isAbsolute(route)
// console.log(tobeAbsolute(route))
// To validate is path is absolute and return if it is relative
const resolvePathA = (route) =>
  path.isAbsolute(route) ? route : path.resolve(route)

// To access the file if it exists BOOLEAN
function pathExists (route) {
  return fs.existsSync(route)
}

// To detec if path is a file or not BOOLEAN
function findDirectory (route) {
  return fs.statSync(route).isDirectory()
}

// To read and find file and directory
const readFileAndDirectory = (route) => {
  let newArray = []
  if (findDirectory(route)) {
    const arrayDirectory = fs.readdirSync(route)
    arrayDirectory.forEach((file) => {
      const joinArray = path.join(route, '/', file)
      // console.log(joinArray)
      if (findDirectory(joinArray)) {
        newArray = newArray.concat(readFileAndDirectory(joinArray))
      } else if (path.extname(joinArray) === '.md') {
        newArray.push(joinArray)
      }
    })
  }
  return newArray
}
// console.log(readFileAndDirectory('C:\\Users\\Usuario\\Documents\\LABORATORIA\\LIM015-md-links\\src'))

const lookFile = (route) => fs.readFileSync(route).toString()

// To extract the links
const extractTheLinks = (route) => {
  const arrayObj = []
  const renderer = new marked.Renderer() // to cacth the information to pass html
  readFileAndDirectory(route).forEach((file) => {
    const readFileMD = lookFile(file)
    renderer.link = (href, title, text) => {
      const linkObj = {
        href: href,
        text: text,
        file: file
      }
      arrayObj.push(linkObj)
    }
    marked(readFileMD, { renderer })
  })
  return arrayObj
}

// const linksObject = extractTheLinks(
//   'C:\\Users\\Usuario\\Documents\\LABORATORIA\\LIM015-md-links\\src'
// )
// console.log(linksObject)

// To validate the options
const confirmOptions = (links) => {
  const arrayPromise = links.map((element) => {
    return fetch(element.href)
      .then((response) => {
        const objResponse = {
          href: element.href,
          text: element.text.substring(0, 50),
          path: element.file,
          status: response.status,
          statusText:
            response.status > 199 && response.status < 400 ? 'Ok' : 'Fail'
        }
        return objResponse
      })
      .catch((err) => {
        const objErr = {
          href: element.href,
          text: element.text.substring(0, 50),
          path: element.file,
          status: 'There was a problem with the Fetch request. ' + err,
          statusText: 'Fail'
        }
        return objErr
      })
  })
  return Promise.all(arrayPromise)
    .then((response) => {
      console.log(response)
    })
    .catch((err) => {
      console.log(err)
    })
}
// confirmOptions(linksObject)

module.exports = {
  tobeAbsolute,
  resolvePathA,
  pathExists,
  findDirectory,
  readFileAndDirectory,
  extractTheLinks,
  confirmOptions
}
