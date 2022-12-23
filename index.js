const fs = require('fs');

let quit = false;

['stickers', 'roles', 'emojis'].forEach((cName) => {
  const base = `./${cName}`;

  if (!fs.existsSync(base)) {
    quit = true;
    fs.mkdirSync(`${base}/images`, { recursive: true });
    fs.mkdirSync(`${base}/reference`);

    let template;
    switch (cName) {
      case 'stickers':
        template = {
          'file name': {
            name: 'sticker name', // typing this makes the sticker pop up
            emoji: 'thinking', // using this emoji makes the sticker pop up
            desc: 'some helpful description', // no effect; just helpful (invite link?)
          },
        };
        break;

      case 'roles':
        template = {
          'file name': { name: 'emoji name' }, // typing this makes the emoji pop up
        };
        break;

      case 'emojis':
        template = {};
        break;

      default:
        template = {};
        break;
    }
    fs.writeFileSync(
      `${base}/metadata_template.json`,
      JSON.stringify(template, undefined, 2)
    );
  }

  fs.copyFileSync(`./templates/index_template.txt`, `${base}/index.js`);
});

if (quit) {
  console.log('please set up folders');
  process.exit();
}

module.exports = {
  stickers: require('./stickers'),
  //   roles: require('./roles'),
  //   emojis: require('./emojis'),
};
