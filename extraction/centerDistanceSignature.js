const space = require('../util/space');

function centerDistanceSignature() {
    return {
        name: 'centerDistanceSignature',
        run: function(image, features) {
            const distances = [];
            const g = features.contourMassCenter;

            for(const point of features.pointSet) {
                const rn = space.distance(point, g);
                distances.push(rn);
            }

            return distances;
        }
    }
}

module.exports = centerDistanceSignature;
