function roughness(epsilon) {
    return {
        name: 'roughness',
        run: function(image, features) {
            let sum = 0;
            const ngtdm = features.ngtdm;

            for(let i = 0; i < ngtdm.length; i++) {
                const row = ngtdm[i];
                sum += row.p * row.s;
            }

            return 1 / (epsilon - sum);
        }
    }
}

module.exports = roughness;
