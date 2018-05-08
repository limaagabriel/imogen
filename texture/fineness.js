function fineness() {
    return {
        name: 'fineness',
        run: function(image, features) {
            let a = 0;
            let b = 0;
            let c = 0;
            const ngtdm = features.ngtdm;

            for(let i = 0; i < ngtdm.length; i++) {
                const iRow = ngtdm[i];
                a += iRow.p * iRow.s;
                c += i * iRow.p;
            }

            for(let j = 0; j < ngtdm.length; j++) {
                const jRow = ngtdm[j];
                b += c - (j * jRow.p);
            }

            return a / b;
        }
    }
}

module.exports = fineness;
