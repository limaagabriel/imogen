const Jimp = require('jimp');
const moments = require('../util/moments');

function convexDeficiency() {
    return {
        name: 'convexDeficiency',
        run: function(image, features) {
            const width = image.bitmap.width;
            const height = image.bitmap.height;
            const contour = new Jimp(width, height, 0x000000FF);
            const convexHull = new Jimp(width, height, 0x000000FF);

            for(const p of features.pointSet) {
                contour.setPixelColor(0xFFFFFFFF, p.x, p.y);
            }

            for(const p of features.convexHullContour) {
                convexHull.setPixelColor(0xFFFFFFFF, p.x, p.y);
            }

            const contourArea = moments.moment2d(contour, 0, 0);
            const convexHullArea = moments.moment2d(convexHull, 0, 0);

            return contourArea - convexHullArea;
        }
    }
}

module.exports = convexDeficiency;
