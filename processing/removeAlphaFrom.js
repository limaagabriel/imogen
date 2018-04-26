function removeAlphaFrom(target) {

    return {
        name: 'removeAlphaFrom',
        run: function(image) {
            for(let j = 0; j < image.bitmap.height; j++) {
                for(let i = 0; i < image.bitmap.width; i++) {
                    if(image.getPixelColor(i, j) == target) {
                        image.setPixelColor(0x00000000, i, j);
                    }
                }
            }

            return image;
        }
    }
}

module.exports = removeAlphaFrom;
