const Jimp = require('jimp');
const path = require('path');
const laplacian = require('./processing/laplacian');
const binarize = require('./processing/binarize');
const ProcessingPipe = require('./processing/pipe');
const pointSet = require('./extraction/pointSet');
const hu = require('./extraction/hu');
const grahamConvexHull = require('./extraction/grahamConvexHull');
const convexHullContour = require('./extraction/convexHullContour');
const aspectRatio = require('./extraction/aspectRatio');
const contourArea = require('./extraction/contourArea');
const contourMassCenter = require('./extraction/contourMassCenter');
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
                                                 .apply(grahamConvexHull())
                                                 .apply(convexHullContour('grahamConvexHull'))
                                                 .apply(contourMassCenter())
                                                 .apply(contourArea())
                                                 .collect();
    
    const regionExtractionPipe = new FeatureExtractionPipe(region, {});
    const regionFeatures = regionExtractionPipe.apply(hu())
                                               .collect();

    console.log(contourFeatures);
    contour.write(resultPath);
};

const readError = console.log;

Jimp.read(imagePath)
    .then(main)
    .catch(readError);
