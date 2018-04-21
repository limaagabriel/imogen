const space = require('../util/space');

function aspectRatio() {
    return {
        name: 'aspectRatio',
        run: function(image, features) {
            const box = features.minBoundingBox;
            const a = space.distance(box[0], box[1]);
            const b = space.distance(box[1], box[2]);

            return a > b? a / b : b / a;
        }
    }
}

module.exports = aspectRatio;
