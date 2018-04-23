const fs = require('fs');
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
const minBoundingBox = require('./extraction/minBoundingBox');
const convexDeficiency = require('./extraction/convexDeficiency');
const grahamConvexHull = require('./extraction/grahamConvexHull');
const convexHullContour = require('./extraction/convexHullContour');
const contourMassCenter = require('./extraction/contourMassCenter');
const complexCoordinates = require('./extraction/complexCoordinates');
const fourierDescriptors = require('./extraction/fourierDescriptors');
const centerDistanceSignature = require('./extraction/centerDistanceSignature');

const ProcessingPipe = require('./processing/pipe');
const FeatureExtractionPipe = require('./extraction/pipe');

const imageName = 'image4.bmp';
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
                                                 .apply(contourArea())
                                                 .apply(contourMassCenter())
                                                 .apply(centerDistanceSignature())
                                                 .apply(complexCoordinates())
                                                 .apply(fourierDescriptors())
                                                 .collect();

    const regionExtractionPipe = new FeatureExtractionPipe(region, {});
    const regionFeatures = regionExtractionPipe.apply(hu())
                                               .apply(pointSet())
                                               .apply(grahamConvexHull())
                                               .apply(convexHullContour())
                                               .apply(convexDeficiency())
                                               .apply(minBoundingBox())
                                               .apply(aspectRatio())
                                               .apply(convexity())
                                               .collect();

    fs.writeFile(path.join('out', 'regionFeatures.json'), JSON.stringify(regionFeatures, null, '\t'), err => {
        if(err) console.log('Error writing to regionFeatures.json');
        else console.log('regionFeatures.json ready!');
    });

    fs.writeFile(path.join('out', 'contourFeatures.json'), JSON.stringify(contourFeatures, null, '\t'), err => {
        if(err) console.log('Error writing to contourFeatures.json');
        else console.log('contourFeatures.json ready!');
    });

    region.write(path.join('out', 'region' + imageName), () => {
        console.log(path.join('out', 'region' + imageName), 'ready!')
    });

    contour.write(path.join('out', 'contour' + imageName), () => {
        console.log(path.join('out', 'contour' + imageName), 'ready!')
    });
};

const readError = console.log;

Jimp.read(imagePath)
    .then(main)
    .catch(readError);
