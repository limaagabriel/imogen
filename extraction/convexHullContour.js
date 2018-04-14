function convexHullContour(convexHullFeature) {
    return {
        name: "convexHullContour",
        run: function(image, features) {
            
            for (const p of convexHull) {
                image.setPixelColor(0xff0000ff, p.x, p.y);
            }
            
            image.setPixelColor(0xffff00ff, p.point.x, p.point.y);
            image.write("out/convexhull.bmp");
            
            return convexHull;
        }
    };
}

module.exports = convexHullContour;
