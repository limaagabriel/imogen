const Jimp = require('jimp');
const path = require('path');
const hu = require('./extraction/hu');
const erosion = require('./processing/erosion');
const dilatation = require('./processing/dilatation');
const negative = require('./processing/negative');
const binarize = require('./processing/binarize');
const pointSet = require('./extraction/pointSet');
const laplacian = require('./processing/laplacian');
const convexity = require('./extraction/convexity');
const aspectRatio = require('./extraction/aspectRatio');
const contourArea = require('./extraction/contourArea');
const subtractFrom = require('./processing/subtractFrom');
const grahamConvexHull = require('./extraction/grahamConvexHull');
const convexHullContour = require('./extraction/convexHullContour');
const contourMassCenter = require('./extraction/contourMassCenter');

const ProcessingPipe = require('./processing/pipe');
const FeatureExtractionPipe = require('./extraction/pipe');

const imageName = 'image4.bmp';
const resultPath = path.join('out', imageName);
const imagePath = path.join('resources', imageName);

const main = image => {
    const regionProcessingPipe = new ProcessingPipe(image);
    const contourProcessingPipe = new ProcessingPipe(image);
    const contour = contourProcessingPipe.apply(binarize())
                                         .apply(erosion())
                                         .apply(subtractFrom(image))
                                         .apply(binarize())
                                         .collect();

    const region = regionProcessingPipe.apply(binarize())
                                       .collect();

    const contourExtractionPipe = new FeatureExtractionPipe(contour, {});
    const contourFeatures = contourExtractionPipe.apply(pointSet())
                                                 .apply(grahamConvexHull())
                                                 .apply(convexHullContour())
                                                 .apply(convexity())
                                                 .apply(contourMassCenter())
                                                 .apply(contourArea())
                                                 .collect();

    const regionExtractionPipe = new FeatureExtractionPipe(region, {});
    const regionFeatures = regionExtractionPipe.apply(hu())
                                               .collect();

    console.log(contourFeatures);
    contour.write(resultPath, () => console.log(resultPath, 'ready!'));
};

const readError = console.log;

Jimp.read(imagePath)
    .then(main)
    .catch(readError);
