function laplacian(limit) {
    const min = 0x00000000;
    const max = 0xFFFFFFFF;

    limit = limit? limit : 0x7F7F7FFF;

    return {
        run: function(image) {
            const width = image.bitmap.width;
            const height = image.bitmap.height;

            for(let j = 0; j < height; j++) {
                for(let i = 0; i < width; i++) {
                    const px = image.getPixelColor(i, j);

                    if(px < limit)
                        image.setPixelColor(min, i, j);
                    else
                        image.setPixelColor(max, i, j);
                }
            }

            return image;
        }
    }
}

module.exports = laplacian;
