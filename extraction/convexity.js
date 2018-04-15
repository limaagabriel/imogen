const space = require('../util/space');

function convexity() {
    return {
        name: "convexity",
        run: function(image, features) {
            const imagePerimeter = space.perimeter(features.pointSet);
            const convexHullPerimeter = space.perimeter(features.convexHullContour);
            return convexHullPerimeter / imagePerimeter;
        }
    };
}

module.exports = convexity;
