function moment2d(image, p, q) {
    let out = 0;
    const m = image.bitmap.width;
    const n = image.bitmap.height;
    const data = image.bitmap.data;

    for(let j = 0; j < n; j++) {
        for(let i = 0;i < m; i++) {
            const idx = image.getPixelIndex(i, j);
            const px = data[idx] / 255;

            const v = Math.pow(i, p) * Math.pow(j, q) * px;
            out += v;
        }
    }

    return out;
}

function central2DMoment(image, p, q) {
    let out = 0;
    const m = image.bitmap.width;
    const n = image.bitmap.height;
    const data = image.bitmap.data;

    const mmz = moment2d(image, 0, 0);
    const xb = moment2d(image, 1, 0) / mmz;
    const yb = moment2d(image, 0, 1) / mmz;

    for(let j = 0; j < n; j++) {
        for(let i = 0;i < m; i++) {
            const idx = image.getPixelIndex(i, j);
            const px = data[idx] / 255;

            const v = Math.pow(i - xb, p) * Math.pow(j - yb, q) * px;
            out += v;
        }
    }

    return out;
}

function normalizedCentral2DMoment(image, p, q) {
    const gm = ((p + q) / 2) + 1;
    const num = central2DMoment(image, p, q);
    const den = Math.pow(central2DMoment(image, 0, 0), gm);
    
    return num / den;
}

function hu() {
    return {
        name: "hu",
        run: function(image, features) {
            const moments = [];
            const data = image.bitmap.data;
            const width = image.bitmap.width;
            const height = image.bitmap.height;

            const nm11 = normalizedCentral2DMoment(image, 1, 1);
            const nm12 = normalizedCentral2DMoment(image, 1, 2);
            const nm21 = normalizedCentral2DMoment(image, 2, 1);
            const nm20 = normalizedCentral2DMoment(image, 2, 0);
            const nm02 = normalizedCentral2DMoment(image, 0, 2);
            const nm30 = normalizedCentral2DMoment(image, 3, 0);
            const nm03 = normalizedCentral2DMoment(image, 0, 3);

            
            moments.push(nm20 + nm02);
            moments.push(Math.pow(nm20 - nm02, 2) + 4 * Math.pow(nm11, 2));
            moments.push(Math.pow(nm30 - 3 * nm12, 2) + Math.pow(3 * nm21 - nm03, 2));
            moments.push(Math.pow(nm30 + nm12, 2) + Math.pow(nm21 - nm03, 2));
            moments.push((nm30 - 3 * nm12) * (nm30 + nm12) * (Math.pow(nm30 + nm12, 2) - 3 * Math.pow(nm21 + nm03, 2)) + (3 * nm21 - nm03) * (nm21 + nm03) * (3 * Math.pow(nm30 + nm12, 2) - Math.pow(nm21 + nm03, 2)));
            moments.push((nm20 - nm02) * (Math.pow(nm30 + nm12, 2) - Math.pow(nm21 + nm03, 2)) + 4 * nm11 * (nm30 + nm12) * (nm21 + nm03));
            moments.push((3 * nm21 - nm03) * (nm30 + nm12) * (Math.pow(nm30 + nm12, 2) - 3 * Math.pow(nm21 + nm03, 2)) + (3 * nm12 - nm30) * (nm21 + nm03) * (3 * Math.pow(nm30 + nm12, 2) - Math.pow(nm21 + nm03, 2)));

            return moments;
        }
    };
}

module.exports = hu;
