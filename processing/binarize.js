const math = require('../util/math');

function binarize(limit) {
    const dtMin = 1;
    const min = 0x00000000;
    const max = 0xFFFFFF00;

    limit = limit? limit : (max + min) / 2;

    return {
        name: 'binarize',
        run: function(image) {
            let t = limit;
            let dt = dtMin;
            const width = image.bitmap.width;
            const height = image.bitmap.height;

            while(dt >= dtMin) {
                const g1 = [];
                const g2 = [];

                for(let j = 0; j < height; j++) {
                    for(let i = 0; i < width; i++) {
                        const px = image.getPixelColor(i, j);
                        if(px < t) g1.push(px);
                        else g2.push(px);
                    }
                }

                const m1 = math.mean(g1);
                const m2 = math.mean(g2);
                const nt = (m1 + m2) / 2;

                dt = Math.abs(nt - t);
                t = nt;
            }

            for(let j = 0; j < height; j++) {
                for(let i = 0; i < width; i++) {
                    const px = image.getPixelColor(i, j);
                    if(px < t) image.setPixelColor(min + 0xff, i, j);
                    else image.setPixelColor(max + 0xff, i, j);
                }
            }

            return image;
        }
    }
}

module.exports = binarize;
