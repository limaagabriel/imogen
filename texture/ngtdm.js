function ngtdm() {
    return {
        name: 'ngtdm',
        run: function(image, features) {
            const width = image.bitmap.width;
            const height = image.bitmap.height;
            const numOfPixels = width * height;

            const range = Array(256).fill(0);
            const ngtdm = range.map(v => {
                return {n: 0, p: 0, s: 0};
            });

            for(let j = 0; j < height; j++) {
                for(let i = 0; i < width; i++) {
                    let neighborhood = 0;
                    let neighborsCount = 0;
                    const index = image.getPixelIndex(i, j);
                    const v = image.bitmap.data[index];

                    for(let b = j - 1; b <= j + 1; b++) {
                        if(b < 0 || b >= height) continue;

                        for(let a = i - 1; a <= i + 1; a++) {
                            if(a == i && b == j) continue;
                            if(a < 0 || a >= width) continue;

                            const idx = image.getPixelIndex(a, b);
                            const neighbor = image.bitmap.data[idx];

                            neighborsCount += 1;
                            neighborhood += neighbor;
                        }
                    }

                    const s = Math.abs(v - (neighborhood / neighborsCount));

                    ngtdm[v].n += 1;
                    ngtdm[v].s += s;
                }
            }

            return ngtdm.map(row => {
                row.p = row.n / numOfPixels;
                return row;
            });
        }
    }
}

module.exports = ngtdm;
