const path = require("path");
const fs = require("fs");
const marked = require("marked");

//const fetch = require("node-fetch");

//To access the file if it exists BOOLEAN
function pathExists(route) {
  return fs.existsSync(route);
}

//To convert the path to absolute
// function resolvePathA(route) {
//   return path.resolve(route);
// }
const resolvePathA = (route) => path.isAbsolute(route) ? route : path.resolve(route)
//To know is an absolute path
//ruta relative
const route = "README.md";
//ruta absolute
const routeOne =
  "C:\\Users\\Usuario\\Documents\\LABORATORIA\\LIM015-md-links\\README.md";
const isAbsolute = path.isAbsolute(route);
//console.log(isAbsolute);

//read file
// fs.readFile("./README.md", "utf8", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(data);
// });
//To read file, it extract a file and the answer return all the information
const readFile = (route) => fs.readFileSync(route)

//To detec if path is a file or not BOOLEAN
function findDirectory(route) {
    return fs.statSync(route).isDirectory();
};

//To read and find file and directory
const readFileandDirectory = (route) => {
  let newArray = []
  if(findDirectory(route)) {
    const arrayDirectory = fs.readdirSync(route)
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

//To extract links of Directory/File
//it have to turn me back arrays of Objects
const extractLinks = (route) => {
  let arrayLinks = []
  const renderPath = new marked.Renderer()
  readFileandDirectory(route).forEach((file) => {
    renderPath.link = (href, file, text) => {
      const linksObject = {
        href,
        text,
        file
      }
      arrayLinks.push(linksObject)
    }
    marked(readFile(file),{renderPath})
  })
  return arrayLinks
}

//
//console.log(readFileandDirectory('C:\\Users\\Usuario\\Documents\\LABORATORIA\\LIM015-md-links\\src'))
//console.log(findDirectory('C:\\Users\\Usuario\\Documents\\LABORATORIA\\LIM015-md-links\\src'))
//console.log(findDirectory('C:\\Users\\Usuario\\Documents\\LABORATORIA\\LIM015-md-links\\src\\index.js'))
//console,log('C:\Users\Usuario\Documents\LABORATORIA\LIM015-md-links\README.md')