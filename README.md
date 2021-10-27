# Markdown Links (Laboratoria)

- Este proyecto se realizó siguiendo estas consideraciones [El Proyecto](https://github.com/Laboratoria/LIM015-md-links) , lo desarrollé dentro del tercer mes en [Laboratoria - Sede Lima](https://www.laboratoria.la/)

- **Periodo :** 18 Agosto - 22 Setiembre, 2021
> En este proyecto se usó JS y Node.JS (Colors, Markdown-it, Yargs)

## Índice

- [1. Preámbulo](#1-preámbulo)
- [2. Resumen del proyecto](#2-resumen-del-proyecto)
- [3. Objetivos de aprendizaje](#3-objetivos-de-aprendizaje)
- [4. Criterios que cumple el proyecto](#4-criterios-que-cumple-el-proyecto)
- [5. Instalación y Uso](#5-instalación-y-uso)
- [6. Consideraciones técnicas](#6-consideraciones-técnicas)

---

## 1. Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado ligero muy popular entre developers. Es usado en muchísimas plataformas que manejan texto plano (GitHub, foros, blogs, ...), y es muy común encontrar varios archivos en ese formato en cualquier tipo de repositorio (empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

![md-links](https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg)

## 2. Resumen del proyecto

[Node.js](https://nodejs.org/es/) es un entorno de ejecución para JavaScript construido con el [motor de JavaScript V8 de Chrome](https://developers.google.com/v8/).
Esto nos va a permitir ejecutar JavaScript en el entorno del sistema operativo, ya sea tu máquina o un servidor, lo cual nos abre las puertas para poder interactuar con el sistema en sí, archivos, redes, ...

En este proyecto nos alejamos un poco del navegador para construir un programa que se ejecute usando Node.js, donde aprenderemos sobre cómo interactuar con el sistema archivos, con el entorno (_proceso_, _env_, _stdin/stdout/stderr_), ...

En este proyecto se creó una herramienta de línea de comando (CLI) así como la propia librería (o biblioteca - library) en JavaScript.

Diseñar tu propia librería es una experiencia fundamental para cualquier
desarrollador porque que te obliga a pensar en la interfaz (API) de tus
_módulos_ y cómo será usado por otros developers. Debes tener especial
consideración en peculiaridades del lenguaje, convenciones y buenas prácticas.

## 3. Objetivos de aprendizaje

### JavaScript

* [x] Diferenciar entre tipos de datos primitivos y no primitivos
* [x] Arrays (arreglos)
* [x] Objetos (key, value)
* [x] Uso de condicionales (if-else, switch, operador ternario, lógica booleana)
* [x] Funciones (params, args, return)
* [x] Recursión o recursividad
* [x] Módulos de CommonJS
* [x] Diferenciar entre expresiones (expressions) y sentencias (statements)
* [x] Callbacks
* [x] Promesas
* [x] Pruebas unitarias (unit tests)
* [x] Pruebas asíncronas
* [x] Uso de mocks y espías
* [ ] Pruebas de compatibilidad en múltiples entornos de ejecución
* [ ] Uso de linter (ESLINT)
* [x] Uso de identificadores descriptivos (Nomenclatura y Semántica)

### Node.js

* [x] Instalar y usar módulos con npm
* [x] Configuración de package.json
* [x] Configuración de npm-scripts
* [x] process (env, argv, stdin-stdout-stderr, exit-code)
* [x] File system (fs, path)

### Control de Versiones (Git y GitHub)

* [x] Git: Instalación y configuración
* [x] Git: Control de versiones con git (init, clone, add, commit, status, push, pull, remote)
* [x] Git: Integración de cambios entre ramas (branch, checkout, fetch, merge, reset, rebase, tag)
* [x] GitHub: Creación de cuenta y repos, configuración de llaves SSH
* [ ] GitHub: Despliegue con GitHub Pages
* [x] GitHub: Colaboración en Github (branches | forks | pull requests | code review | tags)
* [x] GitHub: Organización en Github (projects | issues | labels | milestones | releases)

### HTTP

* [x] Consulta o petición (request) y respuesta (response).
* [x] Codigos de status de HTTP


## 4. Criterios que cumple el proyecto
### General

- [x] Puede instalarse via `npm install --global <github-user>/md-links`

### `README.md`

- [x] Un board con el backlog para la implementación de la librería.
- [x] Documentación técnica de la librería.
- [x] Guía de uso e instalación de la librería

### API `mdLinks(path, opts)`

- [x] El módulo exporta una función con la interfaz (API) esperada.
- [x] Implementa soporte para archivo individual
- [x] Implementa soporte para directorios
- [x] Implementa `options.validate`
- [ ] Agregar la propiedad `line` a cada objeto `link` indicando en qué línea del archivo se encontró el link.

### CLI

- [x] Expone ejecutable `md-links` en el path (configurado en `package.json`)
- [x] Se ejecuta sin errores / output esperado
- [x] Implementa `--validate`
- [x] Implementa `--stats`
- [ ] Agregar más estadísticas.
- [ ] Integración continua con Travis o Circle CI.

### Pruebas / tests

- [x] Pruebas unitarias cubren un mínimo del 70% de statements, functions, lines, y branches.
- [x] Pasa tests (y linters) (`npm test`).


## 5. Instalación y Uso
sgcm14-mdlinks es un CLI que verifica los links que contienen archivos.md, reporta estadísticas de los links y si estan rotos.

```js
$ npm install sgcm14-mdlinks
```
Para acceder se debe importar con   `require('sgcm14-mdlinks')`.

---
### API

La función `mdLinks(path, options)` tiene:

##### Parámetros

- `path`: Ruta **absoluta** o **relativa** al **archivo** o **directorio**.
  Si la ruta pasada es relativa, se resuelve como relativa al directorio desde donde se invoca node - _current working directory_).
- `options`: Un objeto con **únicamente** la siguiente propiedad:
  - `validate`: Booleano que determina si se desea validar los links     encontrados.

##### Valor de retorno

La función **retorna una promesa** (`Promise`) que **resuelve a un arreglo** (`Array`) de objetos (`Object`), donde cada objeto representa un link y contiene las siguientes propiedades

Con `validate:false` :

- `href`: URL encontrada.
- `text`: Texto que aparecía dentro del link (`<a>`).
- `file`: Ruta del archivo donde se encontró el link.

Con `validate:true` :

- `href`: URL encontrada.
- `text`: Texto que aparecía dentro del link (`<a>`).
- `file`: Ruta del archivo donde se encontró el link.
- `status`: Código de respuesta HTTP.
- `statusText`: Mensaje `fail`,`Not Found`,`Internal Server Error`,`Bad Request`,`Forbidden`,etc en caso de fallo u `ok`,`No Content`,etc en caso de éxito. más códigos de error aquí [httpstat.us](https://httpstat.us/)

#### Diagrama de Flujo

![](https://raw.githubusercontent.com/sgcm14/LIM015-md-links/main/src/images/api.png)
>Diagrama de Flujo - API

#### Ejemplo (resultados como comentarios)

```js
const mdLinks = require("sgcm14-mdlinks");

mdLinks("./some/example.md")
  .then((links) => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then((links) => {
    // => [{ href, text, file, status, statusText }, ...]
  })
  .catch(console.error);

mdLinks("./some/dir/")
  .then((links) => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);

  mdLinks("./some/dir/", { validate: true })
  .then((links) => {
    // => [{ href, text, file, status, statusText }, ...]
  })
  .catch(console.error);
```
---
### CLI (Command Line Interface - Interfaz de Línea de Comando)

El ejecutable de nuestra aplicación se ejecuta de la siguiente manera a través de la **terminal**: `md-links <path-to-file> [options]` donde:

##### Parámetros

- `path-to-file`: Ruta **absoluta** o **relativa** al **archivo** o **directorio**.
- `options`: pueden ser:

	- `--validate`: el módulo hace una petición HTTP para averiguar si el link funciona o no. Si el link resulta en una redirección a una URL que responde ok, entonces consideraremos el link como ok.
	- `--stats`: el output (salida) será un texto con estadísticas básicas sobre los links. (**total** y **unique**)
	- `--validate --stats`: para obtener estadísticas que necesiten de los resultados de la validación. (**total**, **unique** y **broken**)

Si se escribe `md-links <path-to-file>` El comportamiento por defecto no valida si las URLs responden o no, solo identifican el archivo markdown (a partir de la ruta que recibe como argumento), analizan el archivo Markdown e imprimen los links que vaya encontrando, junto con la ruta del archivo donde aparece y el texto que hay dentro del link (truncado a 50 caracteres).

#### Diagrama de Flujo

![](https://raw.githubusercontent.com/sgcm14/LIM015-md-links/main/src/images/cli.png)
>Diagrama de Flujo - CLI

#### Ejemplo

```sh
$ md-links ./some/example.md
🅼🅳-🅻🅸🅽🅺🆂
./some/example.md  http://algo.com/2/3/  Link a algo
./some/example.md  https://otra-cosa.net/algun-doc.html  algún doc
./some/example.md  http://google.com/ Google


$ md-links ./some/example.md --validate
🅼🅳-🅻🅸🅽🅺🆂
./some/example.md http://algo.com/2/3/ OK 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html Not Found 404 algún doc
./some/example.md http://google.com/ Moved Permanently 301 Google


$ md-links ./some/example.md --stats
🅼🅳-🅻🅸🅽🅺🆂
Total: 3
Unique: 3


$ md-links ./some/example.md --stats --validate
🅼🅳-🅻🅸🅽🅺🆂
Total: 3
Unique: 3
Broken: 1
```

## 6. Consideraciones técnicas

- La **librería** y el **script ejecutable** (herramienta de línea de comando -   CLI) estan implementados en JavaScript para ser ejecutados con
  Node.js. **Se usó librerías externas**.

- El módulo **es instalable** via `npm install <github-user>/md-links`. Este
  módulo incluye tanto un _ejecutable_ que podemos invocar en la línea de  comando como una interfaz que podemos importar con `require` para usarlo  programáticamente.

- Los **tests unitarios** cubren un mínimo del 70% de _statements_,
  _functions_, _lines_ y _branches_.

- Para este proyecto **no se usó**  `async/await`.

- Para este proyecto fue **opcional** el uso de ES Modules `(import/export)`.



**Realizado por :**

Sammy Gigi Cantoral Montejo (sgcm14)

<img src ="https://raw.githubusercontent.com/sgcm14/sgcm14/main/sammy.jpg" width="200">
