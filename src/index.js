/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const {
  tobeAbsolute,
  resolvePathA,
  pathExists,
  findDirectory,
  readFileAndDirectory,
  extractTheLinks,
  confirmOptions
} = require('./api.js')

const mdLinks = (path) => {
  return new Promise((resolve, reject) => {
    if (pathExists(path)) {
      if (tobeAbsolute(path)) {
        const fileMD = readFileAndDirectory(path)
        fileMD.forEach((md) => {
          const fileLinks = extractTheLinks(md)
          console.log(fileLinks)
        })
        // resolve(fileLinks)
        // console.log(extractTheLinks(fileMD))
        // confirmOptions(fileLinks).then(resolve)
      } else {
      //   const absoluteRoute = resolvePathA(path)
      //   const arrayMD = readFileAndDirectory(absoluteRoute)
      //   const arrayObj = extractTheLinks(arrayMD)
      //   // confirmOptions(arrayObj).then(resolve)
        resolve('no absoluta')
      }
    } else {
      reject(console.log('No existe la ruta'))
    }
  })
}

mdLinks(
  'C:\\Users\\Usuario\\Documents\\LABORATORIA\\LIM015-md-links\\src'
).then((res) => {
  console.log(res)
})

module.exports = { mdLinks }
