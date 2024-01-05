const path = require('path'); // importé modulo path
const fs = require('fs');
const marked = require('marked');
const {JSDOM} = require('jsdom');

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

  

module.exports = {
  converAbsolute,
  pathUserExist,
  isMd,
  readArchive,
  extractLinks
};