const fs = require('fs');
const cName = __dirname.split(process.cwd())[1].split('\\')[1];

const truncate = (str, limit) => str.slice(0, limit);
const iData = (fName) => fs.readFileSync(`./${cName}/images/${fName}.png`);

const collection = () => {
  let data = require(`./metadata.json`);

  Object.keys(data).forEach((fName) => {
    const entry = data[fName];

    if (cName === 'stickers') {
      if (entry.name.length > 28) data[fName].name = truncate(entry, 27);
      if (entry.desc.length > 100) data[fName].desc = truncate(entry, 100);
    } else if (cName === 'roles') {
      // filters
    } else if (cName === 'emojis') {
      // filters
    }

    data[fName].image = iData(fName);
  });

  return data;
};

module.exports = collection();