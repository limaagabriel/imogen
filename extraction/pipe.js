function FeatureExtractionPipe(image, defaultFeatures) {
    this.image = image;
    this.features = Object.assign({}, defaultFeatures);
}

FeatureExtractionPipe.prototype.apply = function(algorithm) {
    if(algorithm.run && algorithm.name) {
        this.features[algorithm.name] = algorithm.run(this.image, this.features);
    }

    return this;
}

FeatureExtractionPipe.prototype.collect = function() {
    return this.features;
}

module.exports = FeatureExtractionPipe;
