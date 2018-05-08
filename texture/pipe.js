function TextureExtractionPipe(image, keepMatrices, defaultFeatures) {
    this.image = image.clone();
    this.keepMatrices = keepMatrices;
    this.features = Object.assign({}, defaultFeatures);
    this.matrices = ['ngtdm', 'histogram', 'coOccurrenceMatrix'];
}

TextureExtractionPipe.prototype.apply = function(algorithm) {
    if(algorithm.run && algorithm.name) {
        console.log('[TextureExtraction] Running', algorithm.name);
        this.features[algorithm.name] = algorithm.run(this.image, this.features);
        console.log('[TextureExtraction] Done', algorithm.name);
    }

    return this;
}

TextureExtractionPipe.prototype.collect = function() {
    if(!this.keepMatrices) {
        const keys = Object.keys(this.features);
        return keys.filter(k => !this.matrices.includes(k))
                   .map(k => Object.assign({}, {[k]: this.features[k]}))
                   .reduce((res, o) => Object.assign(res, o), {});
    }

    return this.features;
}

module.exports = TextureExtractionPipe;
