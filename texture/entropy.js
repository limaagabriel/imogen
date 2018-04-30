function entropy() {
    return {
        name: 'entropy',
        run: function(image, features) {
            let sum = 0;
            const width = image.bitmap.width;
            const height = image.bitmap.height;
            const numOfPixels = width * height;
            const histogram = features.histogram;

            for(let i = 0; i < histogram.length; i++) {
                const zi = histogram[i];
                const pzi = zi / numOfPixels;

                if(pzi > 0) {
                    sum -= pzi * Math.log2(pzi);
                }
            }

            return sum ;
        }
    }
}

module.exports = entropy;
