function energyByOccurrence() {
    return {
        name: 'energyByOccurrence',
        run: function(image, features) {
            let sum = 0;
            const matrix = features.coOccurrenceMatrix;

            for(let j = 0; j < matrix.length; j++) {
                for(let i = 0; i < matrix[0].length; i++) {
                    sum += Math.pow(matrix[j][i], 2);
                }
            }

            return sum;
        }
    }
}

module.exports = energyByOccurrence;
