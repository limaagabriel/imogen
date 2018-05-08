const fs = require('fs');
const Jimp = require('jimp');
const path = require('path');
const mean = require('./texture/mean');
const ngtdm = require('./texture/ngtdm');
const energy = require('./texture/energy');
const entropy = require('./texture/entropy');
const variance = require('./texture/variance');
const contrast = require('./texture/contrast');
const fineness = require('./texture/fineness');
const strength = require('./texture/strength');
const roughness = require('./texture/roughness');
const histogram = require('./texture/histogram');
const asymmetry = require('./texture/asymmetry');
const standardDeviation = require('./texture/standardDeviation');
const coOccurrenceMatrix = require('./texture/coOccurrenceMatrix');
const energyByOccurrence = require('./texture/energyByOccurrence');
const maximumOccurrenceProbability = require('./texture/maximumOccurrenceProbability');

const TextureExtractionPipe = require('./texture/pipe');

const keepMatrices = false;
const images = [
    {
        name: 'sindiag',
        extension: 'gif'
    },
    {
        name: 'hardsin',
        extension: 'jpg'
    },
    {
        name: 'gray',
        extension: 'jpg'
    },
    {
        name: 'solid',
        extension: 'jpg'
    }
];

images.forEach(fileOptions => {
    const fileName = fileOptions.name + '.' + fileOptions.extension;
    const filePath = path.join('resources', fileName);

    const main = image => {
        const grayscaleImage = image.grayscale();
        const pipe = new TextureExtractionPipe(grayscaleImage, keepMatrices);
        const textureFeatures = pipe.apply(ngtdm())
                                    .apply(histogram())
                                    .apply(coOccurrenceMatrix())
                                    .apply(mean())
                                    .apply(energy())
                                    .apply(entropy())
                                    .apply(variance())
                                    .apply(contrast())
                                    .apply(fineness())
                                    .apply(asymmetry())
                                    .apply(strength(0.01))
                                    .apply(roughness(0.01))
                                    .apply(standardDeviation())
                                    .apply(energyByOccurrence())
                                    .apply(maximumOccurrenceProbability())
                                    .collect();

        const data = JSON.stringify(textureFeatures, null, '\t');
        const resultPath = path.join('out', fileOptions.name + 'Texture.json');

        fs.writeFile(resultPath, data, err => {
            if(err) console.log('Error writing to ' + resultPath);
            else console.log(resultPath + ' ready!');
        });
    };

    const error = console.log;

    Jimp.read(filePath)
        .then(main)
        .catch(error);
});
