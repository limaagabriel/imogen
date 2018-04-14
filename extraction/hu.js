const moments = require('../util/moments');

function hu() {
    return {
        name: "hu",
        run: function(image, features) {
            const huMoments = [];
            const data = image.bitmap.data;
            const width = image.bitmap.width;
            const height = image.bitmap.height;

            const nm12 = moments.normalizedCentral2DMoment(image, 1, 2);
            const nm11 = moments.normalizedCentral2DMoment(image, 1, 1);
            const nm21 = moments.normalizedCentral2DMoment(image, 2, 1);
            const nm20 = moments.normalizedCentral2DMoment(image, 2, 0);
            const nm02 = moments.normalizedCentral2DMoment(image, 0, 2);
            const nm30 = moments.normalizedCentral2DMoment(image, 3, 0);
            const nm03 = moments.normalizedCentral2DMoment(image, 0, 3);

            
            huMoments.push(nm20 + nm02);
            huMoments.push(Math.pow(nm20 - nm02, 2) + 4 * Math.pow(nm11, 2));
            huMoments.push(Math.pow(nm30 - 3 * nm12, 2) + Math.pow(3 * nm21 - nm03, 2));
            huMoments.push(Math.pow(nm30 + nm12, 2) + Math.pow(nm21 - nm03, 2));
            huMoments.push((nm30 - 3 * nm12) * (nm30 + nm12) * (Math.pow(nm30 + nm12, 2) - 3 * Math.pow(nm21 + nm03, 2)) + (3 * nm21 - nm03) * (nm21 + nm03) * (3 * Math.pow(nm30 + nm12, 2) - Math.pow(nm21 + nm03, 2)));
            huMoments.push((nm20 - nm02) * (Math.pow(nm30 + nm12, 2) - Math.pow(nm21 + nm03, 2)) + 4 * nm11 * (nm30 + nm12) * (nm21 + nm03));
            huMoments.push((3 * nm21 - nm03) * (nm30 + nm12) * (Math.pow(nm30 + nm12, 2) - 3 * Math.pow(nm21 + nm03, 2)) + (3 * nm12 - nm30) * (nm21 + nm03) * (3 * Math.pow(nm30 + nm12, 2) - Math.pow(nm21 + nm03, 2)));

            return huMoments;
        }
    };
}

module.exports = hu;
