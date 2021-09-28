const path = require("path");
const fs = require("fs");
const userPath = process.argv[2];
const fetch = require("node-fetch");

//To convert the path to absolute
const tobeAbsolute = (userPath) => path.isAbsolute(userPath);
//console.log(tobeAbsolute(userPath))
//To validate is path is absolute and return if it is relative
const resolvePathA = (route) =>
  path.isAbsolute(route) ? route : path.resolve(route);

//To access the file if it exists BOOLEAN
function pathExists(userPath) {
  return fs.existsSync(userPath);
}

//To detec if path is a file or not BOOLEAN
function findDirectory(userPath) {
  return fs.statSync(userPath).isDirectory();
}

//To read and find file and directory
const readFileAndDirectory = (userPath) => {
  let newArray = [];
  if (findDirectory(userPath)) {
    const arrayDirectory = fs.readdirSync(userPath);
    arrayDirectory.forEach((file) => {
      const joinArray = path.join(userPath, "/", file);
      //console.log(joinArray)
      if (findDirectory(joinArray)) {
        newArray = newArray.concat(readFileAndDirectory(joinArray));
      } else if (path.extname(joinArray) === ".md") {
        newArray.push(joinArray);
      }
    });
  }
  return newArray;
};
//console.log(readFileAndDirectory(userPath))

//To extract the links
const extractTheLinks = (userPath) => {
  const arrayLinks = [];
  const regExFile =
    /\[(.*)\]( *)\(((((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n)]+)(?=\)))\)/gi;
  const regExCorchetes = /\[(.*?)\]/gi;
  const regExUrl = /(((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n)]+)(?=\))/gi;
  readFileAndDirectory(userPath).forEach((file) => {
    const readFile = fs.readFileSync(file).toString();
    const matchFile = readFile.match(regExFile);
    if (matchFile != null) {
      for (let i = 0; i < matchFile.length; i++) {
        const text = matchFile[i]
          .match(regExCorchetes)[0]
          .replace("[", "")
          .replace("]", "");
        const href = matchFile[i].match(regExUrl)[0];
        const linkObj = {
          href,
          text,
          file,
        };
        arrayLinks.push(linkObj);
      }
    }
  });
  return arrayLinks;
};
const linksObject = extractTheLinks(
  "C:\\Users\\Usuario\\Documents\\LABORATORIA\\LIM015-md-links\\src"
);
//console.log(linksObject)

//To validate the options
const confirmOptions = (links) => {
  const arrayPromise = links.map((element) => {
    return fetch(element.href)
      .then((response) => {
        const objResponse = {
          href: element.href,
          text: (element.text.substring(0, 50)),
          path: element.file,
          status: response.status,
          statusText:
            response.status > 199 && response.status < 400 ? "Ok" : "Fail",
        };
        return objResponse;
      })
      .catch((err) => {
        const objErr = {
          href: element.href,
          text: (element.text.substring(0, 50)),
          path: element.file,
          status: "There was a problem with the Fetch request. " + err,
          statusText: "Fail",
        };
        return objErr;
      });
  });
  return Promise.all(arrayPromise).then(response => {
    console.log(response);
  }).catch(error => {
    console.log(error)
  });
};
confirmOptions(linksObject)

module.exports = {
  tobeAbsolute,
  resolvePathA,
  pathExists,
  findDirectory,
  readFileAndDirectory,
  extractTheLinks,
  confirmOptions,
};
