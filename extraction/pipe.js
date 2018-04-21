function FeatureExtractionPipe(image, defaultFeatures) {
    this.image = image.clone();
    this.features = Object.assign({}, defaultFeatures);
}

FeatureExtractionPipe.prototype.apply = function(algorithm) {
    if(algorithm.run && algorithm.name) {
        console.log('[ExtractionPipe] Running', algorithm.name);
        this.features[algorithm.name] = algorithm.run(this.image, this.features);
        console.log('[ExtractionPipe] Done', algorithm.name);
    }

    return this;
}

FeatureExtractionPipe.prototype.collect = function() {
    return this.features;
}

module.exports = FeatureExtractionPipe;
