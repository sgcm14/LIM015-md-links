/* module.exports = () => {
  // ...
}; */

const { mdLinks } = require('./md-links');

// VALIDACIONES:
// si el path es VACIO -> ''
// si el path es NULL -> null
// si el archivo NO existe -> readme2.md
// si el directorio NO existe -> ./pruebaDocs/carpeta/
// si el directorio tiene mas directorios -> './pruebaDocs/'
// si la ruta es absoluta -> 'C:/files/leer.md'
// si la ruta es relativa -> './pruebaDocs/pruebita2/leer6.md'

mdLinks('./pru', { validate: false }) //false o true
.then(resolve => {
  console.log(resolve);
}).catch(err => console.log(err));




// './pruebaDocs/contenido.txt'