const moments = require("../util/moments");

function contourArea() {
    return {
        name: "contourArea",
        run: function(image, features) {
            return moments.moment2d(image, 0, 0);
        }
    };
}

module.exports = contourArea;
