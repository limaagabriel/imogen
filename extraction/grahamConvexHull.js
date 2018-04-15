const space = require('../util/space');

const Orientation = {
    LEFT: 2,
    RIGHT: 1,
    COLINEAR: 0
};

function orientation(p1, p2, p3)
{
    const val = (p2.point.x - p1.point.x) * (p3.point.y - p1.point.y) -
                (p3.point.x - p1.point.x) * (p2.point.y - p1.point.y);
 
    if (val == 0) return Orientation.COLINEAR;
    return (val > 0)? Orientation.LEFT : Orientation.RIGHT;
}

function sort(list, p) {
    const polar = (m, n) => {
        const co = m.y - n.y;
        const ca = m.x - n.x;
        const conv = 180 / Math.PI;

        if (ca == 0) return 90;
        else if (ca < 0) return 180 - Math.atan2(co, Math.abs(ca)) * conv;
        else return Math.atan2(co, ca) * conv;
    };

    const mapped = list.map((element, i) => {
        const angle = polar(element.point, p.point);
        const distance = space.squareDistance(element.point, p.point);
        return {index: i, angle: angle, distance: distance};
    });

    const sorted = mapped.sort((a, b) => {
        if(a.angle != b.angle) return a.angle - b.angle;
        else return a.distance - b.distance;
    });

    const result = sorted.map(element => {
        return list[element.index];
    });

    return result;
}

function grahamConvexHull() {
    return {
        name: "grahamConvexHull",
        run: function(image, features) {
            const stack = [];
            const pointSet = features.pointSet.map((p, i) => {
                return {index: i, point: p};
            });

            const orderedByMinXY = pointSet.sort((a, b) => {
                if(a.point.y != b.point.y) return a.point.y - b.point.y;
                else return a.point.x - b.point.x;
            });

            const p = orderedByMinXY[0];
            const pointSetWithoutP = orderedByMinXY.slice(1);
            const orderedPointSet = sort(pointSetWithoutP, p);

            stack.push(p);
            stack.push(orderedPointSet[0]);
            stack.push(orderedPointSet[1]);

            for(let i = 2; i < orderedPointSet.length; i++) {
                let top = stack[stack.length - 1];
                let second = stack[stack.length - 2];
                let current = orderedPointSet[i];

                while(orientation(second, top, current) != Orientation.LEFT && stack.length > 2) {
                    stack.pop();

                    top = stack[stack.length - 1];
                    second = stack[stack.length - 2];
                }

                stack.push(current);
            }

            const convexHull = stack.map(s => s.point);
            for(const p of convexHull) {
                image.setPixelColor(0xFF0000FF, p.x, p.y);
            }

            image.setPixelColor(0xFFFF00FF, p.point.x, p.point.y);
            image.write('out/convexhull.bmp');

            return convexHull;
        }
    };
}

module.exports = grahamConvexHull;
