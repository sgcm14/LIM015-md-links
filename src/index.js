const {
  tobeAbsolute,
  resolvePathA,
  pathExists,
  readFileAndDirectory,
  extractTheLinks
} = require('./api')

const mdLinks = (path, options = { validate: false }) => {
  return new Promise((resolve, reject) => {
    if (pathExists(path)) {
      if (tobeAbsolute(path)) {
        const fileMD = readFileAndDirectory(path)
        const fileLinks = extractTheLinks(fileMD)
        resolve(fileLinks)
        // confirmOptions(fileLinks).then(resolve)
      } else {
        const absoluteRoute = resolvePathA(path)
        const arrayMD = readFileAndDirectory(absoluteRoute)
        const arrayObj = extractTheLinks(arrayMD)
        // confirmOptions(arrayObj).then(resolve)
        resolve(arrayObj)
      }
    } else {
      reject(console.log('No existe la ruta'))
    }
  })
}

module.exports = { mdLinks }
