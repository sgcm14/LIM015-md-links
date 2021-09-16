module.exports = () => {
  // ...
};

read file
const fs = require('fs');

fs.readFile('./README.md', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

// To access path
const path = require('path');
//ruta relative
const route = 'README.md';
//ruta absolute
const routeOne = 'C:\\Users\\Usuario\\Documents\\LABORATORIA\\LIM015-md-links\\README.md';
const isAbsolute = path.isAbsolute(route);
console.log(isAbsolute);