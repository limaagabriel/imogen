// const fft = require('fft-js').fft;
const space = require('../util/space');

function dft(data) {
    const output = [];

    for(let m = 0; m < data.length; m++) {
        let x = [0, 0];

        for(let n = 0; n < data.length; n++) {
            const ck = data[n];
            const v = - ((2 * Math.PI * n * m) / data.length);
            const real = Math.cos(v);
            const imag = Math.sin(v);
            const exp = [real, imag];

            x[0] += ck[0] * exp[0] + ck[1] * exp[1];
            x[1] += ck[0] * exp[1] + ck[1] * exp[0];
        }

        x[0] = x[0] / data.length;
        x[1] = x[1] / data.length;
        output.push(x);
    }

    return output;
}

function reconstruct(data, points, approx) {
    const output = [];
    const mn = Math.floor(approx / 2);
    const center = Math.floor(data.length / 2);

    for(let m = 0; m < points; m++) {
        let x = [0, 0];

        for(let n = 0; n < approx; n++) {
            const ck = data[n];
            const v = (2 * Math.PI * n * m) / points;
            const real = Math.cos(v);
            const imag = Math.sin(v);
            const exp = [real, imag];

            x[0] += ck[0] * exp[0] + ck[1] * exp[1];
            x[1] += ck[0] * exp[1] + ck[1] * exp[0];
        }

        output.push(x);
    }

    // process.exit(0);
    return output;
}


function fourierDescriptors() {
    return {
        name: 'fourierDescriptors',
        run: function(image, features) {
            const n = features.pointSet.length;
            const cx = Math.round(image.bitmap.width / 2);
            const cy = Math.round(image.bitmap.height / 2);
            const complex = features.pointSet.map(p => [p.x, p.y]);

            const descriptors = dft(complex);
            const reconstructed = reconstruct(descriptors, descriptors.length, 256);

            for (const p of reconstructed) {
                console.log(p);
                image.setPixelColor(0xff00ffff, p[0], p[1]);
            }

            image.write("out/fourier.bmp", () => {
                process.exit(0);
            });

            return descriptors;
        }
    }
}

module.exports = fourierDescriptors;
