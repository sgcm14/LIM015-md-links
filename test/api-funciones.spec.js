const {pathResult, pathAbsolute, renderMdtoHTML, fileMd, isPathValid, isFile, isFolder,
  checkLink, statusLinks, fileRead, extractLinks, formatDirRead} = require('../src/api-funciones.js');  

describe('pathResult', () => {

  it('should be a function', () => {
    expect(typeof pathResult).toBe('function');
  });

  it ('should return the path', () => {
    expect (pathResult('./test/')).toEqual(__dirname); // se cambio xq no cambiaba ruta si movias el proyecto
  });

});

describe('pathAbsolute', () => {
  
  it('should be a function', () => {
    expect(typeof pathAbsolute).toBe('function');
  });

  it ('should return true, if the path is absolute', () => {
    expect (pathAbsolute(__dirname)).toBeTruthy();  // se cambio xq no cambiaba ruta si movias el proyecto
  });

});

describe('renderMdtoHTML', () => {
  const content = `[Página](https://httpstat.us/500)`;
  
  it('should be a function', () => {
    expect(typeof renderMdtoHTML).toBe('function');
  });

  it ('should return in format <a href></a> a file .md', () => {
    expect (renderMdtoHTML(content)).toMatch(`<p><a href="https://httpstat.us/500">Página</a></p>`);
  });

});

describe('fileMd', () => {
  
  it('should be a function', () => {
    expect(typeof fileMd).toBe('function');
  });

  it ('should return true, if the file is .md', () => {
    expect (fileMd('archivo.md')).toBeTruthy();
  });

});

describe('isPathValid', () => {
  
  it('should be a function', () => {
    expect(typeof isPathValid).toBe('function');
  });

  it ('should return true, if the path exist', () => {
    expect (isPathValid(__dirname)).toBeTruthy();
  });

  it ('should return false, if the path do not exist', () => {
    expect (isPathValid(`${__dirname}ss`)).toBeFalsy();
  });

});

describe('isFile', () => {
  
  it('should be a function', () => {
    expect(typeof isFile).toBe('function');
  });

  it ('should return true, if the path is file', () => {
    expect (isFile(__filename)).toBeTruthy();
  });

  it ('should return false, if the path is not file', () => {
    expect (isFile(__dirname)).toBeFalsy();
  });

});

describe('isFolder', () => {
  
  it('should be a function', () => {
    expect(typeof isFolder).toBe('function');
  });

  it ('should return true, if the path is directory', () => {
    expect (isFolder(__dirname)).toBeTruthy();
  });

  it ('should return false, if the path is not directory', () => {
    expect (isFolder(__filename)).toBeFalsy();
  });

});

describe('checkLink', () => {
  
  it('should be a function', () => {
    expect(typeof checkLink).toBe('function');
  });

});

describe('statusLinks', () => {
  
  it('should be a function', () => {
    expect(typeof statusLinks).toBe('function');
  });

});

describe('fileRead', () => {
  const links = [{
    href: 'https://httpstat.us/400',
    text: 'Página-400',
    file: (`${__dirname}\\files_testing\\testing\\file2.md`).replace(/\\/g,'/')
  }];

  it('should be a function', () => {
    expect(typeof fileRead).toBe('function');
  });

  it('should return links if received a file and the path relative', () => {
    expect (fileRead('./test/files_testing/testing/file2.md')).toEqual(links);
  });

  it('should return links if received a file and the path absolute', () => {
    expect (fileRead(`${__dirname}\\files_testing\\testing\\file2.md`)).toEqual(links);
  });

});

describe('extractLinks', () => {
  const links = [[{
    href: 'https://httpstat.us/400',
    text: 'Página-400',
    file: (`${__dirname}\\files_testing\\testing\\file2.md`).replace(/\\/g,'/')
  }]];

  /* const links2 = [[
    {
      href: 'https://httpstat.us/500',
      text: 'Página-500',
      file: (`${__dirname}\\files_testing\\file1.md`).replace(/\\/g,'/')
    }
  ],
  [
    {
      href: 'https://www.googlexx34.com',
      text: 'Google fail',
      file: (`${__dirname}\\files_testing\\file3.md`).replace(/\\/g,'/')
    }
  ],
  [
    {
      href: 'https://httpstat.us/400',
      text: 'Página-400',
      file: (`${__dirname}\\files_testing\\testing\\file2.md`).replace(/\\/g,'/')
    }
  ]]; */

  const links2 = [[
    {
      href: 'https://httpstat.us/400',
      text: 'Página-400',
      file: (`${__dirname}\\files_testing\\testing\\file2.md`).replace(/\\/g,'/')
    }
  ],
  [
    {
      href: 'https://httpstat.us/500',
      text: 'Página-500',
      file: (`${__dirname}\\files_testing\\file1.md`).replace(/\\/g,'/')
    }
  ],
  [
    {
      href: 'https://www.googlexx34.com',
      text: 'Google fail',
      file: (`${__dirname}\\files_testing\\file3.md`).replace(/\\/g,'/')
    }
  ]];

  it('should be a function', () => {
    expect(typeof extractLinks).toBe('function');
  });

  it('should return links if the path have files', () => {
    expect (extractLinks('./test/files_testing/testing/')).toEqual(links);
  });

  it('should return links if the path have directories', () => {
    expect (extractLinks('./test/files_testing/')).toEqual(links2);
  });

});

describe('formatDirRead', () => {
  const links = [{
    href: 'https://httpstat.us/400',
    text: 'Página-400',
    file: (`${__dirname}\\files_testing\\testing\\file2.md`).replace(/\\/g,'/')
  }];

  it('should be a function', () => {
    expect(typeof formatDirRead).toBe('function');
  });

  it('should return links in a single array', () => {
    expect (formatDirRead('./test/files_testing/testing/')).toEqual(links);
  });

});
