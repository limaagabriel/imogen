const moments = {};
moments.moment2d = function(image, p, q) {
    let out = 0;
    const m = image.bitmap.width;
    const n = image.bitmap.height;
    const data = image.bitmap.data;
    
    for (let j = 0; j < n; j++) {
        for (let i = 0; i < m; i++) {
            const idx = image.getPixelIndex(i, j);
            const px = data[idx] / 255;
            
            const v = Math.pow(i, p) * Math.pow(j, q) * px;
            out += v;
        }
    }
    
    return out;
};

moments.central2DMoment = function(image, p, q) {
    let out = 0;
    const m = image.bitmap.width;
    const n = image.bitmap.height;
    const data = image.bitmap.data;
    
    const mmz = this.moment2d(image, 0, 0);
    const xb = this.moment2d(image, 1, 0) / mmz;
    const yb = this.moment2d(image, 0, 1) / mmz;
    
    for (let j = 0; j < n; j++) {
        for (let i = 0; i < m; i++) {
            const idx = image.getPixelIndex(i, j);
            const px = data[idx] / 255;
            
            const v = Math.pow(i - xb, p) * Math.pow(j - yb, q) * px;
            out += v;
        }
    }
    
    return out;
};

moments.normalizedCentral2DMoment = function(image, p, q) {
    const gm = (p + q) / 2 + 1;
    const num = this.central2DMoment(image, p, q);
    const den = Math.pow(this.central2DMoment(image, 0, 0), gm);
    
    return num / den;
};

module.exports = moments;