function erosion() {
    const kernelSum = 9;
    const kernel = [
        [0, 1, 0],
        [1, 1, 1],
        [0, 1, 0]
    ];

    return {
        run: function(image) {
            const newImage = image.clone();
            const yt = Math.floor(kernel.length / 2);
            const xt = Math.floor(kernel[0].length / 2);

            for(let j = 0; j < image.bitmap.height; j++) {
                if(j - yt < 0) continue;
                if(j + yt >= image.bitmap.height) continue;

                for(let i = 0; i < image.bitmap.width; i++) {
                    if(i - xt < 0) continue;
                    if(i + xt >= image.bitmap.width) continue;
                    if(image.getPixelColor(i, j) < 0xFFFFFFFF) continue;

                    const values = [];

                    for(let b = 0; b < kernel.length; b++) {
                        for(let a = 0; a < kernel[0].length; a++) {
                            if(kernel[b][a] == 1) {
                                const xPos = i + a - xt;
                                const yPos = j + b - yt;
                                const p = image.getPixelColor(xPos, yPos);

                                values.push(p);
                            }
                        }
                    }

                    const value = Math.min.apply(null, values);
                    newImage.setPixelColor(value, i, j);
                }
            }

            newImage.write('out/erosion.bmp');
            return newImage;
        }
    };
}

module.exports = erosion;
