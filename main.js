var inquirer = require('inquirer');
var isLetter = require("is-letter");

var Word = require("./word.js");
var List = require("./wordlist.js");

var hangman = {
    wordBank: List.newWord.wordList,
    guessesRemaining: 10,
    guessedLetters: [],
    display: 0,
    currentWord: null,

    startGame: function() {
        var that = this;
        if(this.guessedLetters.length > 0) {
            this.guessedLetters = [];
        }

        inquirer.prompt([{
                name: "play",
                type: "confirm",
                message: "Are you ready to play?"
            
        }]).then(function(answer) {
            if(answer.play){
                that.newGame();
            } else{
                console.log("Then why did you open this? Strange...");
            }
        })
    },

    newGame: function() {
        if(this.guessesRemaining === 10) {
            console.log("Okay, lets start.");
            console.log("=========");

            var randNum = Math.floor(Math.random()*this.wordBank.length);
            this.currentWord = new Word(this.wordBank[randNum]);
            this.currentWord.getLetters();
            console.log(this.currentWord.wordRender());
            this.promptUser();
        } else {
            this.reset();
            this.newGame();
        }
    },
    reset: function() {
        this.guessesRemaining = 10;
    },
    promptUser: function() {
        var that = this;
        inquirer.prompt([{
            name: "guessedletter",
            type: "input",
            message: "Choose a letter:",
            validate: function(value) {
                if(isLetter(value)){
                    return true;
                }else{
                    return false;
                }
            }
        }]).then(function(ltr) {
            var letterReturned = (ltr.guessedletter).toUpperCase();
            var guessedAlready = false;
            for(var i = 0; i < that.guessedLetters.length; i++) {
                if(letterReturned === that.guessedLetters[i]){
                    guessedAlready = true;
                    console.log("You guessed that letter already.  Try again.");
                    that.promptUser();
                }
            }
            if(guessedAlready === false){
                that.guessedLetters.push(letterReturned);
                var found = that.currentWord.checkIfLetterFound(letterReturned);
                if (found === 0){
                    console.log("That is not in the word. Try again.");
                    that.guessesRemaining--;
                    console.log("Guesses remaining:", that.guessesRemaining);
                    console.log("=======");
                    console.log(that.currentWord.wordRender());
                    console.log("======");
                    console.log("Letters guessed:", that.guessedLetters);
                }else {
                    console.log("You guessed right!");
                    that.guessesRemaining--;
                    if(that.currentWord.wasTheWordGuessed() === true){
                        console.log(that.currentWord.wordRender());
                        console.log("Congratulations!");
                    }else{
                        console.log("Guesses remaining:", that.guessesRemaining);
                        console.log(that.currentWord.wordRender());
                        console.log("======");
                        console.log("Letters guessed:", that.guessedLetters);
                    }
                }
                if(that.guessesRemaining > 0 && that.currentWord.wordFound === false) {
                    that.promptUser();
                }else if(that.guessesRemaining === 0) {
                    console.log("Game over!");
                    console.log("The word ou were guessing was:", that.currentWord.word);
                }else if(that.currentWord.wasTheWordGuessed() === true){
                    hangman.startGame();
                }
                else{
                    console.log("You guessed that letter alrady.  Try again");
                    that.promptUser();
                }
            }
        });
    }

}

hangman.startGame();