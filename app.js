const Jimp = require('jimp');
const path = require('path');
const laplacian = require('./processing/laplacian');
const binarize = require('./processing/binarize');
const ProcessingPipe = require('./processing/pipe');
const aspectRatio = require('./extraction/aspectRatio');
const FeatureExtractionPipe = require('./extraction/pipe');

const imageName = 'image4.bmp';
const resultPath = path.join('out', imageName);
const imagePath = path.join('resources', imageName);

const main = image => {
    const processingPipe = new ProcessingPipe(image);
    const contour = processingPipe.apply(laplacian())
                                  .apply(binarize())
                                  .collect();

    const extractionPipe = new FeatureExtractionPipe(contour);
    const features = extractionPipe.apply(aspectRatio()).collect();
    console.log(features);

    contour.write(resultPath, () => {
        console.log(resultPath + ' ready');
    });
};

const readError = console.log;

Jimp.read(imagePath)
    .then(main)
    .catch(readError);
