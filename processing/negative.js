function negative(limit) {
    const min = 0x000000ff;
    const max = 0xffffffff;
    
    return {
        run: function(image) {
            const width = image.bitmap.width;
            const height = image.bitmap.height;
            
            for (let j = 0; j < height; j++) {
                for (let i = 0; i < width; i++) {
                    const px = image.getPixelColor(i, j);
                    image.setPixelColor(max - px + min, i, j);
                }
            }
            
            return image;
        }
    };
}

module.exports = negative;
