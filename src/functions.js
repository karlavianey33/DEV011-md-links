const path = require('path'); // importé modulo path
const fs = require('fs');
const marked = require('marked');
const {JSDOM} = require('jsdom');
const axios = require('axios');
const converAbsolute = (pathUser) =>
// console.log('cómo llega el path: ', pathUser);
  (path.isAbsolute(pathUser) ? pathUser : path.resolve(pathUser));

const pathUserExist = (pathUser) => fs.existsSync(pathUser);

const isMd = (pathUser) => 
  path.extname(pathUser) === '.md';

  const readArchive = (pathUser) => {  //funcion para leer el archivo
   return new Promise((resolve, reject) => {
    fs.readFile(pathUser, 'utf-8', (err, data) => { //usamos metodo readfile
      if (err) {
        reject('Error al leer el archivo');
      } else {
        resolve(data);
      }
    });
  }); 

  };

  const extractLinks = (data, pathUser) => { //funcion para extraer enlaces

    const html = marked.parse(data);
    const dom = new JSDOM(html); //convertir html a un objeto DOM
    const nodeListA = dom.window.document.querySelectorAll("a");
  
    const enlacesExtraidos = []; //alamcenamos los enlaces extraidos  en un arreglo
  
    nodeListA.forEach((anchor) => { //itera sobre los elementos
      enlacesExtraidos.push({
        href: anchor.href,
        text: anchor.textContent,
        file: pathUser
      }); //agrega href del enlace al arreglo
    });

    return enlacesExtraidos; //devulve el arreglo de enlaces
  };

  const validateLinks = (enlacesExtraidos) => {
    const newArrayEnlaces = enlacesExtraidos.map((link) => {
      return axios
        .get(link.href)
        .then((result) => {
          // Si el código de estado es exitoso (200-299), asigna "ok"
          const ok = result.status >= 200 && result.status <= 299 ? "ok" : "fail";
          return {
            ...link,
            status: result.status,
            statusText: result.statusText,
            ok,
          };
        })
        .catch((err) => {
          return {
            ...link,
            status: err.status || undefined, // Si no hay un código de estado, asigna undefined
            statusText: err.statusText || "Error al validar el enlace",
            ok: "fail", // En caso de error, asigna "fail"
          };
        });
    });
  
    return Promise.all(newArrayEnlaces);
  };
  
  

module.exports = {
  converAbsolute,
  pathUserExist,
  isMd,
  readArchive,
  extractLinks,
  validateLinks
};