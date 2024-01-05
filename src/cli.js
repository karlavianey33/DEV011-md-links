const {mdLinks} = require ('./index.js');

mdLinks("docs/04-milestone.md")
.then(res => console.log("esta es la respuesta", res))
.catch(error => console.error("este es el error", error))