function strength(epsilon) {
    return {
        name: 'strength',
        run: function(image, features) {
            let a = 0;
            let b = 0;
            const ngtdm = features.ngtdm;

            for(let i = 0; i < ngtdm.length; i++) {
                const iRow = ngtdm[i];

                b += iRow.s;

                for(let j = 0; j < ngtdm.length; j++) {
                    const jRow = ngtdm[j];

                    a += (iRow.p + jRow.p) * Math.pow(i - j, 2);
                }
            }

            return a / (epsilon + b);
        }
    }
}

module.exports = strength;
