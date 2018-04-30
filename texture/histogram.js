const math = require('../util/math');

function histogram() {
    return {
        name: 'histogram',
        run: function(image, features) {
            return math.histogram(image);
        }
    }
}

module.exports = histogram;
