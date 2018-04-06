function laplacian(limit) {
    const min = 0;
    const max = 255;

    limit = limit? limit : 127;

    return {
        run: function(image) {
            const width = image.bitmap.width;
            const height = image.bitmap.height;

            for(let j = 0; j < height; j++) {
                for(let i = 0; i < width; i++) {
                    const idx = image.getPixelIndex(i, j);

                    if(image.bitmap.data[idx] < limit)
                        image.bitmap.data[idx] = min;
                    else {
                        image.bitmap.data[idx] = max;
                        console.log('max!');
                        console.log(min, max, image.bitmap.data[idx]);
                    }

                }
            }

            return image;
        }
    }
}

module.exports = laplacian;
