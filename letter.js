var Letter = function(l) {
    this.letter = l;
    this.appear = false;

    this.letterRender = function () {
        if (this.letter == "") {
            this.appear = true;
            return '  ';
        }if(this.appear === false) {
            return ' _ ';
        }else {
            return this.letter;
        }
    };
};

module.exports = Letter;