const math = {};

math.mean = function(list) {
    const n = list.length;
    const sum = list.reduce((a, b) => a + b);
    return sum / n;
}

module.exports = math;
