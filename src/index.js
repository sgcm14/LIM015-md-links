const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

//read file
fs.readFile('./README.md', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

//to access the file if it exists BOOLEAN
const pathExists = path => fs.existsSync(path);

// To access path

//ruta relative
const route = 'README.md';
//ruta absolute
const routeOne = 'C:\\Users\\Usuario\\Documents\\LABORATORIA\\LIM015-md-links\\README.md';
const isAbsolute = path.isAbsolute(route);
console.log(isAbsolute);