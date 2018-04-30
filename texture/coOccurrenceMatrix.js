function coOccurrenceMatrix() {
    return {
        name: 'coOccurrenceMatrix',
        run: function(image, features) {
            const range = Array(256).fill(0);
            const width = image.bitmap.width;
            const height = image.bitmap.height;
            const total = height * (width - 1);

            const matrix = range.map(v => {
                return Array(256).fill(0);
            });

            for(let j = 0; j < height; j++) {
                for(let i = 0; i < width - 1; i++) {
                    const i1 = image.getPixelIndex(i, j);
                    const i2 = image.getPixelIndex(i + 1, j);

                    const a = image.bitmap.data[i1];
                    const b = image.bitmap.data[i2];

                    matrix[a][b] +=  1 / total;
                }
            }

            return matrix;
        }
    }
}

module.exports = coOccurrenceMatrix;
