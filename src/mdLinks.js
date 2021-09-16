const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

//To access the file if it exists BOOLEAN
function pathExists(route) {
    return fs.existsSync(route);
  }

//ruta relative
const route = 'README.md';
//ruta absolute
const routeOne = 'C:\\Users\\Usuario\\Documents\\LABORATORIA\\LIM015-md-links\\README.md';
const isAbsolute = path.isAbsolute(route);
console.log(isAbsolute);

//read file
fs.readFile('./README.md', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
  });