#!/usr/bin/env node

/* module.exports = () => {
  // ...
}; */

const { mdLinks } = require('./md-links');

// validaciones:
// 1.- si el path es null
// 2.- si el archivo existe

mdLinks('./pruebaDocs/')
.then(resolve => {
  console.log(resolve);
}).catch(err => console.log(err));

/*
mdLinks('C:/files/leer.md')
.then(resolve => {
  console.log(resolve);
}).catch(err => console.log(err));

mdLinks('./pruebaDocs/')
.then(resolve => {
  console.log(resolve);
}).catch(err => console.log(err));

mdLinks('./pruebaDocs/contenido.txt')
.then(resolve => {
  console.log(resolve);
}).catch(err => console.log(err));

mdLinks(null)
.then(resolve => {
  console.log(resolve);
}).catch(err => console.log(err)); 

mdLinks('./pruebaDocs/')
.then(resolve => {
  console.log(resolve);
}).catch(err => console.log(err)); */
