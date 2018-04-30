function mean() {
    return {
        name: 'mean',
        run: function(image, features) {
            let sum = 0;
            const width = image.bitmap.width;
            const height = image.bitmap.height;
            const numOfPixels = width * height;

            for(let j = 0; j < height; j++) {
                for(let i = 0; i < width; i++) {
                    const index = image.getPixelIndex(i, j);
                    const v = image.bitmap.data[index];

                    sum += v;
                }
            }

            return sum / numOfPixels;
        }
    }
}

module.exports = mean;
