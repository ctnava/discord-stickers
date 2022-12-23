const fs = require('fs');

let quit = false;

['stickers', 'roles', 'emojis'].forEach((cName) => {
  if (!fs.existsSync(`./${cName}`)) {
    quit = true;
    fs.mkdirSync(`./${cName}/images`, { recursive: true });
    fs.mkdirSync(`./${cName}/reference`);

    let template;
    switch (cName) {
      case 'stickers':
        template = {
          stickerFileName: {
            // REQUIRED: 320x320  && < 512KB
            name: 'sticker name', // typing this makes the sticker pop up
            emoji: 'thinking', // using this emoji makes the sticker pop up
            desc: 'some helpful description', // no effect; just helpful (invite link?)
          },
        };
        fs.copyFileSync(
          './templates/sticker.png',
          `./${cName}/images/stickerFileName.png`
        );
        break;

      case 'roles':
        template = {
          // REQUIRED: >(64 x 64) && < 256KB
          roleIconFileName: {
            name: 'role name', // typing this makes the role pop up
            color: '#000000', // custom role color
            permissions: [], // general server permissions DEFAULT: all false
            separate: false, // display role members separately from online members,
            mentions: false, // allow anyone to mention this role
            hasIcon: true, // has role icon
          },
        };
        fs.copyFileSync(
          './templates/roleIcon.png',
          `./${cName}/images/roleIconFileName.png`
        );
        break;

      case 'emojis':
        template = {
          // REQUIRED: ~128 x 128 && < 256KB
          emojiFileName: {
            name: 'emoji name', // typing this makes the emoji pop up (alphanumeric + underscores)
          },
        };
        fs.copyFileSync(
          './templates/emoji.png',
          `./${cName}/images/emojiFileName.png`
        );
        break;

      default:
        template = {};
        break;
    }
    fs.writeFileSync(
      `./${cName}/metadata.json`,
      JSON.stringify(template, undefined, 2)
    );
  }

  fs.copyFileSync(`./templates/index_template.txt`, `./${cName}/index.js`);
});

if (quit) {
  console.log('please set up folders');
  process.exit();
}

module.exports = {
  emojis: require('./emojis'),
  roles: require('./roles'),
  stickers: require('./stickers'),
};
