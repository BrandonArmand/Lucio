const ID_SIZE = 5;
const VALUES = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
                0,1,2,3,4,5,6,7,8,9];
const multiplier = 1;

function generateId(seed, size = ID_SIZE, array = VALUES){
    let result = []
    let rng = new RNG(seed, multiplier)

    for (let i = 0; i < size; i++){
        result.push(rng.choice(array))
    }
    
    return result.join('')
}

function RNG(seed, c) {
    this.m = 0x80000000
    this.a = 1103515296;
    this.c = c;
  
    this.state = seed ? seed : Math.floor(Math.random() * (this.m - 1));
    this.nextInt = function() {
        this.state = (this.a * this.state + this.c) % this.m;
        return this.state;
    };

    this.nextFloat = function() {
        return this.nextInt() / (this.m - 1);
    };

    this.nextRange = function(start, end) {
        let rangeSize = end - start;
        let randomUnder1 = this.nextInt() / this.m;
        return start + Math.floor(randomUnder1 * rangeSize);
    };

    this.choice = function(array) {
        return array[this.nextRange(0, array.length)];
    };
}

module.exports = {generateId}