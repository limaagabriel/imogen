const Jimp = require('jimp');
const image = new Jimp(512, 512, 0x7F7F7FFF);
image.write('resources/solid.jpg');
