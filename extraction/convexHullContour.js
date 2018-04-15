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

function convexHullContour(convexHullFeature) {
    return {
        name: "convexHullContour",
        run: function(image, features) {
            let p, q;
            const contour = [];
            const feature = convexHullFeature?
                convexHullFeature : 'grahamConvexHull';
            const convexHull = features[feature];

            for(let i = 0; i < convexHull.length; i++) {
                p = convexHull[i];
                q = convexHull[(i + 1) % convexHull.length];
                
                contour.push(p);
                bresenhamPointGenerator(p, q, point => {
                    contour.push(point);
                });
                contour.push(q);
            }

            const uniquePointsContour = makeItUnique(contour, (a, b) => {
                return a.x == b.x && a.y == b.y;
            });
            
            for (const p of uniquePointsContour) {
                image.setPixelColor(0xff0000ff, p.x, p.y);
            }
            
            image.write("out/convexhull.bmp");
            return uniquePointsContour
        }
    };
}

module.exports = convexHullContour;
