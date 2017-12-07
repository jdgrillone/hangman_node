var Letter = require("./letter.js");

function Word(w) {
    var that = this;
    this.word = w;
    this.letters = [];
    this.wordFound = false;

    this.getLetters = function() {
        for(var i = 0; i < that.word.length; i++) {
            var newLetter = new Letter(that.word[i]);
            this.letters.push(newLetter);
        }
    };

    this.wasTheWordGuessed = function() {
        if(this.letters.every(function(lttr) {
            return lttr.appear === true;
        })){
            this.wordFound = true;
            return true;
        }
    };

    this.checkIfLetterFound = function(guess) {
        var whatReturn = 0;

        this.letters.forEach(function(lttr){
            if(lttr.letter === guess){
                lttr.appear = true;
                whatReturn++;
            }
        })
        return whatReturn;
    };

    this.wordRender = function() {
        var display = '';
        that.letters.forEach(function(lttr){
            var currentLetter = lttr.letterRender();
            display+= currentLetter;
        });
        return display;
    };
}

module.exports = Word;