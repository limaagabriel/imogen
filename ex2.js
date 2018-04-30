const fs = require('fs');
const Jimp = require('jimp');
const path = require('path');
const mean = require('./texture/mean');
const ngtdm = require('./texture/ngtdm');
const energy = require('./texture/energy');
const entropy = require('./texture/entropy');
const variance = require('./texture/variance');
const contrast = require('./texture/contrast');
const roughness = require('./texture/roughness');
const histogram = require('./texture/histogram');
const asymmetry = require('./texture/asymmetry');
const standardDeviation = require('./texture/standardDeviation');

const TextureExtractionPipe = require('./texture/pipe');

const images = [
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
        const pipe = new TextureExtractionPipe(grayscaleImage);
        const textureFeatures = pipe.apply(histogram())
                                    .apply(ngtdm())
                                    .apply(mean())
                                    .apply(variance())
                                    .apply(standardDeviation())
                                    .apply(energy())
                                    .apply(entropy())
                                    .apply(asymmetry())
                                    .apply(roughness())
                                    .apply(contrast())
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


// const image = {
//     bitmap: {
//         width: 4,
//         height: 4,
//         data: [1, 2, 5, 2, 3, 5, 1, 3, 1, 3, 5, 5, 3, 1, 1, 1]
//     },
//     getPixelIndex: function(x, y) {
//         return x + y * this.bitmap.width;
//     }
// }
//
// console.log(ngtdm().run(image, {}));
