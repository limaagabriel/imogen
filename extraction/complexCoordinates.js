const space = require('../util/space');

function complexCoordinates() {
    return {
        name: 'complexCoordinates',
        run: function(image, features) {
            const center = features.contourMassCenter;
            const coordinates = features.pointSet.map(point => {
                return [point.x - center.x, point.y - center.y];    //z = [re, im]
            });

            return coordinates;
        }
    }
}

module.exports = complexCoordinates;
