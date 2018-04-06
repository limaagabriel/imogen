function aspectRatio() {
    return {
        name: 'aspectRatio',
        run: function(image) {
            const pixelsOfInterest = [];
            const data = image.bitmap.data;
            const width = image.bitmap.width;
            const height = image.bitmap.height;
            const distances = {min: Number.MAX_VALUE, max: Number.MIN_VALUE};

            for(let j = 0; j < height; j++) {
                for(let i = 0; i < width; i++) {
                    const idx = image.getPixelIndex(i, j);
                    const p = data[idx];

                    if(p == 255) {
                        const coordinate = {
                            id: pixelsOfInterest.length + 1,
                            x: i,
                            y: j
                        };

                        pixelsOfInterest.push(coordinate);
                    };
                }
            }

            // TODO: get max and min axes
        }
    }
}

module.exports = aspectRatio;
