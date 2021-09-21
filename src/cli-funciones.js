const stats = (array) => {
  const links = array.map((item) => item.href);
  const unique = links.filter(function(item, index, array) {
    return array.indexOf(item) === index;
  })
  return (`Total: ${links.length} \nUnique: ${unique.length}`);
}

const isBroken = (array) => {
  const codeStatus = array.filter((item) => item.status>=400);
  return (`\nBroken: ${codeStatus.length}`);
}

module.exports = {stats,isBroken};
