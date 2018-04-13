const Jimp = require('jimp');
const path = require('path');
const laplacian = require('./processing/laplacian');
const binarize = require('./processing/binarize');
const ProcessingPipe = require('./processing/pipe');
const pointSet = require('./extraction/pointSet');
const hu = require('./extraction/hu');
const aspectRatio = require('./extraction/aspectRatio');
const contourGravityCenter = require('./extraction/contourGravityCenter');
const FeatureExtractionPipe = require('./extraction/pipe');

const imageName = 'leaf_1.bmp';
const resultPath = path.join('out', imageName);
const imagePath = path.join('resources', imageName);

const main = image => {
    const regionProcessingPipe = new ProcessingPipe(image);
    const contourProcessingPipe = new ProcessingPipe(image);
    const contour = contourProcessingPipe.apply(laplacian())
                                         .apply(binarize())
                                         .collect();

    const region = regionProcessingPipe.apply(binarize())
                                       .collect();                                

    const contourExtractionPipe = new FeatureExtractionPipe(contour, {});
    const contourFeatures = contourExtractionPipe.apply(pointSet())
                                                 .apply(contourGravityCenter())
                                                 .collect();
    
    const regionExtractionPipe = new FeatureExtractionPipe(region, {});
    const regionFeatures = regionExtractionPipe.apply(hu())
                                               .collect();

    console.log(regionFeatures);                                               

    region.write(resultPath, () => {
        console.log(resultPath + ' ready');
    });
};

const readError = console.log;

Jimp.read(imagePath)
    .then(main)
    .catch(readError);
