function subtractFrom(imageToUse) {
    return {
        run: function(image) {
            const imageFrom = imageToUse.clone();
            const normalizeAlpha = (p) => {
                const sp = p.toString(16);
                const nsp = sp.slice(0, sp.length - 2) + 'ff';
                return parseInt(nsp, 16);
            };

            for (let j = 0; j < image.bitmap.height; j++) {
                for (let i = 0; i < image.bitmap.width; i++) {
                    const p1 = imageFrom.getPixelColor(i, j);
                    const p2 = image.getPixelColor(i, j);
                    const px = p1 - p2 < 0 ? 0 : p1 - p2;
                    const v = normalizeAlpha(px);

                    imageFrom.setPixelColor(v, i, j);
                }
            }

            imageFrom.write('out/subfrom.bmp');
            return imageFrom;
        }
    };
}

module.exports = subtractFrom;
