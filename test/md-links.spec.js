const mdLinks = require('../src/index.js');
const readArchive=require('../src/functions.js');//llamamos lo que queremnos analizar
const {validateLinks} = require('../src/functions.js');
describe ('Esta constante tiene una promesa',() =>{
  it('Debería devolver false si la función no tiene una promesa', () => {
    const tiene =(readArchive) =>{};
  expect(tiene.then).not.toBeDefined();
  });

  
});

describe('Test para saber si mdlinks es una función', () => {
  it('Debería devolver true si la variable es una función', () => {
    const miFuncion = (mdLinks) => {};
    expect(typeof miFuncion).toBe('function');
  });
  it('Debería devolver false si la función no tiene una promesa', () => {
    const miFuncion = (mdLinks) => {};
    expect(miFuncion.then).not.toBeDefined();
  });
});





const mockAxios = {
  get: jest.fn(),
};

describe('validateLinks', () => {
  it('debe devolver un arreglo de objetos con el estado del enlace', () => {
    const mockResponse = { status: 200 };
    const enlacesExtraidos = [
      { href: 'https://www.example.com' },
      { href: 'https://www.example.com/broken-link' },
    ];

    jest.spyOn(mockAxios, 'get').mockReturnValue(Promise.resolve(mockResponse));

    // Modificado para devolver un arreglo
    const enlacesValidados = validateLinks(enlacesExtraidos, mockAxios);

    // Verificamos si enlacesValidados es un arreglo
    if (!Array.isArray(enlacesValidados)) {
      throw new Error('La función validateLinks debe devolver un arreglo');
    }

    expect(enlacesValidados).toHaveLength(2);
    expect(enlacesValidados[0].status).toBe(200);
    expect(enlacesValidados[1].status).toBe(404);
  });
});
