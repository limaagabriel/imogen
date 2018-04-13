function pointSet() {
    return {
        name: "pointSet",
        run: function(image, features) {
            const points = [];
            const data = image.bitmap.data;
            const width = image.bitmap.width;
            const height = image.bitmap.height;

            for(let j = 0; j < height; j++) {
                for (let i = 0; i < width; i++) {
                    const idx = image.getPixelIndex(i, j);
                    const p = data[idx];

                    if (p == 255) {
                        points.push({x: i, y: j});
                    }
                }
            }

            return points;
        }
    };
}

module.exports = pointSet;
