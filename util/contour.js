const contour = {};

function bresenhamPointGenerator(begin, end, callback) {
    let error = 0;
    let x = begin.x;
    let y = begin.y;

    const dx = parseFloat(end.x) - parseFloat(begin.x);
    const dy = parseFloat(end.y) - parseFloat(begin.y);
    const shouldFollowX = Math.abs(dx) >= Math.abs(dy);
    const xFlow = isNaN(dx / Math.abs(dx)) ? 0 : dx / Math.abs(dx);
    const yFlow = isNaN(dy / Math.abs(dy)) ? 0 : dy / Math.abs(dy);
    const dError = shouldFollowX? Math.abs(dy / dx) : Math.abs(dx / dy);

    if(shouldFollowX) {
        while(x != end.x) {
            callback({x, y});
            x += xFlow;

            error += dError;
            while(error >= 0.5) {
                error -= 1;
                y += yFlow;
            }
        }
    } else {
        while(y != end.y) {
            callback({x, y});
            y += yFlow;

            error += dError;
            while(error >= 0.5) {
                error -= 1;
                x += xFlow;
            }
        }
    }
}

function makeItUnique(list, equalityFn) {
    return list.reduce((a, b) => {
        const i = a.findIndex(k => {
            return equalityFn(b, k);
        });

        if(i >= 0) {
            return a;
        } else {
            a.push(b);
            return a;
        }
    }, []);
}

contour.make = function(points) {
    const contourPoints = [];

    for(let i = 0; i < points.length; i++) {
        p = points[i];
        q = points[(i + 1) % points.length];

        contourPoints.push(p);
        bresenhamPointGenerator(p, q, point => {
            contourPoints.push(point);
        });
        contourPoints.push(q);
    }

    const uniquePointsContour = makeItUnique(contourPoints, (a, b) => {
        return a.x == b.x && a.y == b.y;
    });

    return contourPoints;
};

module.exports = contour;
