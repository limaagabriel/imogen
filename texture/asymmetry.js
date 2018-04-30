const moments = require('../util/moments');

function asymmetry() {
    return {
        name: 'asymmetry',
        run: function(image, features) {
            const histogram = features.histogram;
            return moments.aroundMean(histogram, 3);
        }
    }
}

module.exports = asymmetry;
