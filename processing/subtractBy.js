function subtractBy(imageToUse) {
    return {
        run: function(image) {
            const normalizeAlpha = (p) => {
                const sp = p.toString(16);
                const nsp = sp.slice(0, sp.length - 2) + 'ff';
                return parseInt(nsp, 16);
            };

            for (let j = 0; j < image.bitmap.height; j++) {
                for (let i = 0; i < image.bitmap.width; i++) {
                    const p1 = image.getPixelColor(i, j);
                    const p2 = imageToUse.getPixelColor(i, j);
                    const px = p1 - p2 < 0 ? 0 : p1 - p2;
                    const v = normalizeAlpha(px);


                    image.setPixelColor(v, i, j);
                }
            }

            image.write('out/subby.bmp');
            return image;
        }
    };
}

module.exports = subtractBy;
