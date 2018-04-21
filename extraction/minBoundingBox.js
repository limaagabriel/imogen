const space = require('../util/space');
const contour = require('../util/contour');

function area(rect) {
    const a = space.distance(rect[0], rect[1]);
    const b = space.distance(rect[1], rect[2]);

    return a * b;
}

function getAxisAligned(points) {
    const topmost = points.sort((a, b) => a.y - b.y)[0];
    const leftmost = points.sort((a, b) => a.x - b.x)[0];
    const rightmost = points.sort((a, b) => b.x - a.x)[0];
    const bottommost = points.sort((a, b) => b.y - a.y)[0];

    const axisAligned = [
        {x: leftmost.x, y: topmost.y},
        {x: rightmost.x, y: topmost.y},
        {x: rightmost.x, y: bottommost.y},
        {x: leftmost.x, y: bottommost.y}
    ];

    return axisAligned;
}

function minBoundingBox() {
    return {
        name: 'minBoundingBox',
        run: function(image, features) {
            const angles = [];
            const convexHull = features.grahamConvexHull;

            for(let i = 1; i < 360; i++) {
                angles.push(i);
            }

            const axisAligned = getAxisAligned(convexHull);
            // const contourBox = contour.make(axisAligned);
            const axisAlignedArea = area(axisAligned);

            const result  = angles.reduce((previousResult, currentAngle) => {
                const newConvexHull = space.rotate(convexHull, currentAngle);
                const newAxisAligned = getAxisAligned(newConvexHull);
                const newArea = area(newAxisAligned);

                if(newArea < previousResult.area)
                    return {box: newAxisAligned, area: newArea, angle: currentAngle};
                else
                    return previousResult;

            }, { box: axisAligned, area: axisAlignedArea, angle: 0 });

            const minBoundingBox = space.rotate(result.box, -result.angle);
            const intBoundingBox = minBoundingBox.map(p => {
                const q = {
                    x: Math.round(p.x),
                    y: Math.round(p.y)
                };

                return q;
            });

            const contourBox = contour.make(intBoundingBox);

            for (const p of contourBox) {
                image.setPixelColor(0xffff00ff, p.x, p.y);
            }

            image.write("out/minBoundingBox.bmp");
            return intBoundingBox
        }
    }
}

module.exports = minBoundingBox;
