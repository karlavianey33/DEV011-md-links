const {converAbsolute, pathUserExist, isMd, readArchive, extractLinks,validateLinks} = require("./functions");

function mdLinks (path,validate) {
  return new Promise ((resolve, reject) => {
  
  const rutaConvertida = converAbsolute(path);
  
  const isOk = pathUserExist(rutaConvertida)
  if(isOk===false){
    reject('La ruta no existe')
  }
  const isMarkdown = isMd(rutaConvertida)
  if(isMarkdown===false) {
    reject('no es MD')
  }
 
  readArchive(rutaConvertida)
      .then((resData) => {
      const links = extractLinks(resData, rutaConvertida) 
        if (validate) {
          const linksValidate = validateLinks(links);
          resolve(linksValidate);
        }else{
        resolve(links);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}






module.exports = {
  mdLinks
};