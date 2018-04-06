function laplacian() {
    const kernel = [
        [ 0, -1,  0],
        [-1,  4, -1],
        [ 0, -1,  0]
    ];

    return {
        run: function(image) {
            image.convolute(kernel);
            return image;
        }
    }
}

module.exports = laplacian;
