const moments = require('../util/moments');

function contourMassCenter() {
    return {
        name: 'contourMassCenter',
        run: function(image, features) {
            const m10 = moments.moment2d(image, 1, 0);
            const m01 = moments.moment2d(image, 0, 1);
            const m00 = moments.moment2d(image, 0, 0);

            const center = {
                x: Math.floor(m10 / m00),
                y: Math.floor(m01 / m00)
            };

            image.setPixelColor(0xff0000ff, center.x, center.y);
            image.write("out/center.bmp");

            return center;
        }
    }
}

module.exports = contourMassCenter;
