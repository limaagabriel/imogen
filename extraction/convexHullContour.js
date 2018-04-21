const contour = require('../util/contour');

function convexHullContour(convexHullFeature) {
    return {
        name: "convexHullContour",
        run: function(image, features) {
            let p, q;
            const feature = convexHullFeature?
                convexHullFeature : 'grahamConvexHull';
            const convexHull = features[feature];
            const uniquePointsContour = contour.make(convexHull);

            for (const p of uniquePointsContour) {
                image.setPixelColor(0xff0000ff, p.x, p.y);
            }

            image.write("out/convexhull.bmp");
            return uniquePointsContour
        }
    };
}

module.exports = convexHullContour;
