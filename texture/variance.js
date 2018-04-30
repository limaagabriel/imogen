function variance() {
    return {
        name: 'variance',
        run: function(image, features) {
            let sum = 0;
            const mean = features.mean;
            const width = image.bitmap.width;
            const height = image.bitmap.height;
            const numOfPixels = width * height;

            for(let j = 0; j < height; j++) {
                for(let i = 0; i < width; i++) {
                    const index = image.getPixelIndex(i, j);
                    const v = image.bitmap.data[index];

                    sum += Math.pow(v - mean, 2);
                }
            }

            return sum / numOfPixels;
        }
    }
}

module.exports = variance;
