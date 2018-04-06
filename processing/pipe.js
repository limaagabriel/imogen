function ProcessingPipe(image) {
    this.image = image;
}

ProcessingPipe.prototype.apply = function(algorithm) {
    if(algorithm.run) this.image = algorithm.run(this.image);
    return this;
}

ProcessingPipe.prototype.collect = function() {
    return this.image;
}

module.exports = ProcessingPipe;
