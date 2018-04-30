const math = {};

math.mean = function(list) {
    const n = list.length;
    const sum = list.reduce((a, b) => a + b);
    return sum / n;
}

math.histogram = function(image) {
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    const histogram = Array(256).fill(0);

    for(let j = 0; j < height; j++) {
        for(let i = 0; i < width; i++) {
            const index = image.getPixelIndex(i, j);
            const v = image.bitmap.data[index];

            histogram[v] += 1;
        }
    }

    return histogram;
};

math.sum = function(array) {
    return array.reduce((a, b) => a + b);
}

math.histogramMean = function(histogram) {
    let sum = 0;
    const total = math.sum(histogram);

    for(let i = 0; i < histogram.length; i++) {
        const zi = histogram[i];
        const pzi = zi / total;
        sum += pzi * i;
    }

    return sum;
};

module.exports = math;
