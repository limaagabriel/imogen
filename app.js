const Jimp = require('jimp');
const path = require('path');
const ProcessingPipe = require('./processing/processingPipe');
const laplacian = require('./processing/laplacian');

const imageName = 'image4.bmp';
const resultPath = path.join('out', imageName);
const imagePath = path.join('resources', imageName);

const main = image => {
    const pipe = new ProcessingPipe(image);
    const edgeImage = pipe.apply(laplacian()).collect();

    edgeImage.write(resultPath, () => {
        console.log(resultPath + ' ready');
    });
};

const readError = console.log;

Jimp.read(imagePath)
    .then(main)
    .catch(readError);
