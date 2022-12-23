const truncate = (str, limit) => str.slice(0, limit);
const iData = (fName) => fs.readFileSync(`${__dirname}/images/${fName}.png`);

const collection = () => {
  let data = require(`${__dirname}/metadata.json`);
  const cName = __dirname.split('/')[__dirname.split('/').length];

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

    data[fName].image = iData(cName, fName);
  });

  return data;
};

module.exports = collection();
