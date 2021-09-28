const { mdLinks } = require('./index.js')
const route = process.argv[2]

mdLinks(route, { validate: false })
  .then((value) => {
    console.log(value)
  })
  .catch((err) => {
    console.log(err)
  })
