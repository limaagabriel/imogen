function TextureExtractionPipe(image, defaultFeatures) {
    this.image = image.clone();
    this.features = Object.assign({}, defaultFeatures);
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
    return this.features;
}

module.exports = TextureExtractionPipe;
