const {mdLinks} = require ('./index.js');

mdLinks("src/prueba.md",true)
.then(res => console.log("esta es la respuesta", res))
.catch(error => console.error("este es el error", error))