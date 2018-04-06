function FeatureExtractionPipe(image) {
    this.image = image;
    this.features = {};
}

FeatureExtractionPipe.prototype.apply = function(algorithm) {
    if(algorithm.run && algorithm.name) {
        this.features[algorithm.name] = algorithm.run(this.image);
    }

    return this;
}

FeatureExtractionPipe.prototype.collect = function() {
    return this.features;
}

module.exports = FeatureExtractionPipe;
