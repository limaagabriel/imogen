function maximumOccurrenceProbability() {
    return {
        name: 'maximumOccurrenceProbability',
        run: function(image, features) {
            let max = -1;
            const matrix = features.coOccurrenceMatrix;

            for(let j = 0; j < matrix.length; j++) {
                for(let i = 0; i < matrix[0].length; i++) {
                    const p = matrix[j][i];
                    if(p > max) max = p;
                }
            }

            return max;
        }
    }
}

module.exports = maximumOccurrenceProbability;
