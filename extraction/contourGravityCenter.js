function contourGravityCenter() {
    return {
        name: 'contourGravityCenter',
        run: function(image, features) {
            let a = 0;
            const center = {x: 0, y: 0};
            const pointSet = features.pointSet;

            for(let i = 0; i < pointSet.length - 1; i++) {
                const currentPoint = pointSet[i];
                const nextPoint = pointSet[i + 1];
                
                const xi = currentPoint.x;
                const yi = currentPoint.y;
                const xip = nextPoint.x;
                const yip = nextPoint.y;

                const p = (xi * yip) - (xip * yi);
                center.x += ((xi + xip) * p);
                center.y += ((yi + yip) * p);
                
                a += p;
            }

            a = Math.abs(a) / 2.0;
            center.x = center.x / (6.0 * a);
            center.y = center.y / (6.0 * a);

            return center;
        }
    }
}

module.exports = contourGravityCenter;
