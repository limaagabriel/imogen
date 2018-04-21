const space = {};

space.squareDistance = function(p, q) {
    const dx = Math.pow(p.x - q.x, 2);
    const dy = Math.pow(p.y - q.y, 2);
    return dx + dy;
}

space.distance = function(p, q) {
    return Math.sqrt(space.squareDistance(p, q));
}

space.perimeter = function(curve) {
    let perimeter = 0;
    const length = curve.length;

    for(let i = 0; i < length; i++) {
        const p1 = curve[i];
        const p2 = curve[(i + 1) % length];

        perimeter += space.distance(p1, p2);
    }

    return perimeter;
}

space.rotate = function(points, angle) {
    const output = [];

    for(const point of points) {
        const p = {
            x: point.x * Math.cos(angle) - point.y * Math.sin(angle),
            y: point.x * Math.sin(angle) + point.y * Math.cos(angle)
        };

        output.push(p);
    }
    
    return output;
}

module.exports = space;
