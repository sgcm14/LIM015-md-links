const { stats, isBroken } = require("../src/cli-funciones");

const array = [
  {
    href: 'https://httpstat.us/400',
    text: 'Página-400',
    file: 'C:/Users/Estudiante/Desktop/mdlinksprueba/test/files_testing/testing/file2.md'
  }
];

describe('stats', () => {

  it('should be a function', () => {
    expect(typeof stats).toBe('function');
  });
  
  it('should return the stats of links', () => {
    expect (stats(array)).toEqual(`Total: 1 \nUnique: 1`);
  });

});

describe('isBroken', () => {
    
  it('should be a function', () => {
    expect(typeof isBroken).toBe('function');
  });

  it('should return the broken links', () => {
    expect (isBroken(array)).toEqual(`\nBroken: 0`);
  });
  
});
  