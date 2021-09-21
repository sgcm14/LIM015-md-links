const { mdLinks } = require('../src/md-links.js'); 

describe('mdLinks', () => {

  const links = [
    {
      href: 'https://httpstat.us/400',
      text: 'Página-400',
      file: (`${__dirname}\\files_testing\\testing\\file2.md`).replace(/\\/g,'/'), //se cambio xq no cambiaba ruta si movias el proyecto
      status: 400,
      statusText: 'Bad Request'
    }
  ];

  const linksError = [
    {
      href: 'https://www.googlexx34.com',
      text: 'Google fail',
      file: (`${__dirname}\\files_testing\\file3.md`).replace(/\\/g,'/'), //se cambio xq no cambiaba ruta si movias el proyecto
      status: 500,
      statusText: 'FAIL'
    }
  ];
  
  it('should be a function', () => {
    expect(typeof mdLinks).toBe('function');
  });

  it ('should return an Object if received a directory', () => {
    expect (typeof mdLinks('./test/files_testing/testing/', { validate: true })).toBe('object');
  });

  it ('should return an Object if received a file', () => {
    expect (typeof mdLinks('./test/files_testing/testing/file2.md', { validate: false })).toBe('object');
  });

  it ('should return an ERROR if the path do not exist', () => {
    return expect (mdLinks('./test/files_testing/test/')).rejects.toMatch('La ruta del archivo o directorio no existe');
  });

  it ('should return an ERROR if the path is not valid', () => {
    return expect (mdLinks('')).rejects.toMatch('Ingrese la ruta del archivo o directorio');
  });

  test('should return the data if validate is TRUE and link EXIST', () => {
    const result = mdLinks('./test/files_testing/testing/', { validate: true });
    return result.then(data => {
      expect(data).toStrictEqual(links);
    });
  });

  test('should return the data if validate is TRUE and link FAIL', () => {
    const result = mdLinks('./test/files_testing/file3.md', { validate: true });
    return result.then(data => {
      expect(data).toStrictEqual(linksError);
    });
  });

  /*test('the fetch fails with an error', () => {
    const result = mdLinks(pathReceivedError, { validate: true });
    console.log(result);
    console.log(linksError);
    return expect(result).rejects.toMatch(linksError);
  });*/

  /*test('the fetch fails with an error', () => {
    const result = mdLinks(pathReceived, { validate: true });
    expect.assertions(1);
    return result.catch(e => expect(e).toMatch('error'));
  });*/

  /*test('the data is peanut butter', () => {
    const result = mdLinks(pathReceived, { validate: true });
    return expect(result).resolves.toStrictEqual(links);
  });*/
});
