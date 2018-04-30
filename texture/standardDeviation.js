function standardDeviation() {
    return {
        name: 'standardDeviation',
        run: function(image, features) {
            const variance = features.variance;
            return Math.sqrt(variance);
        }
    }
}

module.exports = standardDeviation;
