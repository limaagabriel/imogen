function ProcessingPipe(image) {
    this.image = image.clone();
}

ProcessingPipe.prototype.apply = function(algorithm) {
    if(algorithm.run && algorithm.name) {
        console.log('[ProcessingPipe] Running', algorithm.name);
        this.image = algorithm.run(this.image);
        console.log('[ProcessingPipe] Done', algorithm.name);
    }
    return this;
}

ProcessingPipe.prototype.collect = function() {
    return this.image;
}

module.exports = ProcessingPipe;
