function ProcessingPipe(image) {
    this.image = image.clone();
}

ProcessingPipe.prototype.apply = function(algorithm) {
    if(algorithm.run) this.image = algorithm.run(this.image);
    return this;
}

ProcessingPipe.prototype.collect = function() {
    return this.image;
}

module.exports = ProcessingPipe;
