function firstPoint(image, width, height) {
    for(let j = 0; j < height; j++) {
        for (let i = 0; i < width; i++) {
            const p = image.getPixelColor(i, j);

            if (p > 0x000000ff) {
                return {x: i, y: j};
            }
        }
    }

    return null;
}

function rotate(image, b, c) {
    const min = 0x000000ff;
    const verify = (c) => image.getPixelColor(c.x, c.y) > min;
    const positionVerify = (b, c) => {
        if(c.x == b.x - 1 && c.y == b.y) return 0;
        if(c.x == b.x - 1 && c.y == b.y - 1) return 1;
        if(c.x == b.x && c.y == b.y - 1) return 2;
        if(c.x == b.x + 1 && c.y == b.y - 1) return 3;
        if(c.x == b.x + 1 && c.y == b.y) return 4;
        if(c.x == b.x + 1 && c.y == b.y + 1) return 5;
        if(c.x == b.x && c.y == b.y + 1) return 6;
        if(c.x == b.x - 1 && c.y == b.y + 1) return 7;
        return -1;
    };

    const actions = [
        {
            increment: (c) => { c.y -= 1; return c; },
            lastPosition: (c) => {return {x: c.x, y: c.y + 1}}
        },
        {
            increment: (c) => { c.x += 1; return c; },
            lastPosition: (c) => {return {x: c.x - 1, y: c.y}}
        },
        {
            increment: (c) => { c.x += 1; return c; },
            lastPosition: (c) => {return {x: c.x - 1, y: c.y}}
        },
        {
            increment: (c) => { c.y += 1; return c; },
            lastPosition: (c) => {return {x: c.x, y: c.y - 1}}
        },
        {
            increment: (c) => { c.y += 1; return c; },
            lastPosition: (c) => {return {x: c.x, y: c.y - 1}}
        },
        {
            increment: (c) => { c.x -= 1; return c; },
            lastPosition: (c) => {return {x: c.x + 1, y: c.y}}
        },
        {
            increment: (c) => { c.x -= 1; return c; },
            lastPosition: (c) => {return {x: c.x + 1, y: c.y}}
        },
        {
            increment: (c) => { c.y -= 1; return c; },
            lastPosition: (c) => {return {x: c.x, y: c.y + 1}}
        }
    ];

    const initialAction = positionVerify(b, c);

    for(let i = 0; i < actions.length; i++) {
        const currentAction = actions[(i + initialAction) % actions.length];
        c = currentAction.increment(c);
        if(verify(c)) return {b: c, c: currentAction.lastPosition(c)};
    }

    return null;
}

function equals(a, b) {
    return a.x == b.x && a.y == b.y;
}

function pointSet() {
    return {
        name: "pointSet",
        run: function(image, features) {
            const points = [];
            const data = image.bitmap.data;
            const width = image.bitmap.width;
            const height = image.bitmap.height;

            const b0 = firstPoint(image, width, height);
            const temp = rotate(image, b0, {x: b0.x - 1, y: b0.y});
            const b1 = temp.b;

            points.push(b1);

            let b = b1, c = temp.c;
            while(!equals(b, b0)) {
                const t = rotate(image, b, c);
                b = t.b;
                c = t.c;

                points.push(b);
            }

            for(const p of points) {
                image.setPixelColor(0x00ff00ff, p.x, p.y);
            }
            image.setPixelColor(0xffff00ff, b0.x, b0.y);

            image.write('out/pointset.bmp');
            return points;
        }
    };
}

module.exports = pointSet;
