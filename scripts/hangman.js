document.body.style.backgroundImage = "url('images/hangman/black.jpg')";

let words;
// let word;
// let wordLength;
// let hint;
// let correctGuesses;
let game;
let imagehandler;
let imageNumber             = 0;
// let incorrectGuesses        = 0;
let hangmanImage            = document.getElementById("hangman-image");
let wordDisplay             = document.getElementById("wordDisplay");
let buttonsDisplay          = document.getElementById("alphabet");
let guessDisplay            = document.getElementById("guesses");
let hintDisplay             = document.getElementById("hint");

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function newGame() {
    let numberOfWords = words.length;
    let token = getRandomInt(numberOfWords);
    word = words[token]["word"].toUpperCase();
    hint = words[token]["hint"];
    game = new HangmanGame(word, hint);
    game.setup();
}

class HangmanGame{
    
    constructor(word, hint){
        this.word               = word
        this.hint               = hint
        this.wordLength         = word.length;
        this.correctGuesses     = 0;
        this.incorrectGuesses   = 0;
    }

    //Sets up a new game of hangman
    setup() { 
        //Sets that stage for the game
        hangmanImage.src        = "images/hangman/hangman.png";
        guessDisplay.innerHTML  = `<p><strong>Guesses: </strong>0/7</p>`;
        
        //Adds alphabet of buttons
        for (let i = 1; i <= 26; i++) {
            this.addButton(String.fromCharCode(64 + i));
        }
    
        //create blanks
        for(let i in this.word) {
            let element = document.createElement("h3");
            element.innerHTML = (this.word[i] != "-") ? "_" : "-";
            element.setAttribute("id", `B${i}`);
            wordDisplay.appendChild(element);
        }

        //display hint
        hintDisplay.innerHTML = `<p>Hint: ${this.hint}</p>`;
    }

    //Adds a button with a letter
    addButton(char) {
        //Create an input type dynamically.
        let element = document.createElement("button");
        //Assign different attributes to the element.
        element.textContent = char;
        element.setAttribute("id", char);
        element.setAttribute("value", char);
        element.setAttribute("type", "button");
        element.setAttribute("name", char);
        element.setAttribute("onclick", "game.guess(this)");
        //Append the element in page (in span).
        buttonsDisplay.appendChild(element);
    }

    guess(element) {
        let guessedWrong = true;
        let letter = element.textContent;
        element.disabled = true;
        element.hidden = true;
        
        for(let i in this.word) {
            if(this.word[i] == letter) {
                document.getElementById(`B${i}`).innerHTML = letter;
                this.correctGuesses++;
                guessedWrong = false;
            }
        }
        if(this.correctGuesses == this.wordLength) this.gameOver("YOU WIN");
        if(guessedWrong) this.draw();
    }

    draw() {
        this.incorrectGuesses++;
        clearInterval(imagehandler);                                                                    //Needs attention
        if (this.incorrectGuesses < 8) {
            guessDisplay.innerHTML = `<p><strong>Guesses: </strong>${this.incorrectGuesses}/7</p>`;
            if (this.incorrectGuesses == 7) {
                setTimeout(() => {
                    this.gameOver("YOU LOSE");
                }, 2000);
            }
            imagehandler = setInterval(() => {
                imageNumber++;
                hangmanImage.src = `images/hangman/hangman-0${this.incorrectGuesses}-${imageNumber%3}.png`;
            }, 150);
        }
    }

    gameOver(message) {
        clearInterval(imagehandler);
        wordDisplay.innerHTML = "";
        guessDisplay.innerHTML = `<p><strong>${message}</strong></p>`;
        hintDisplay.innerHTML = `<P onclick = "newGame()"><strong>PLAY AGAIN</strong></p>`;
        buttonsDisplay.innerHTML = "";
    }
}

fetch("json/words.json").then(function( response ){
    //response.ok determines if file data was received ok or not
    console.log(`Fetch response received. response.ok is ${response.ok}`);
    if(response.ok){
        console.log(`Response is ok, proceed to access data`);
        //forward the data to the next .then() stage
        return response.json();
    }
})
.then(function(data){                 
    words = data;
    newGame();
})
.catch(function(){
    console.log("fetch error");
});

//Create guess tracker
// function guess(element) {
//     let letter = element.textContent;
//     element.disabled = true;
//     element.hidden = true;
//     let guessedWrong = true;
//     for(let i in word) {
//         if(word[i] == letter) {
//             document.getElementById(`B${i}`).innerHTML = letter;
//             correctGuesses++;
//             guessedWrong = false;
//         }
//     }
//     if(correctGuesses == wordLength) gameOver("YOU WIN");
//     if(guessedWrong) hangman();
// }

//Create hang animation
// function hangman() {
//     incorrectGuesses++;
//     clearInterval(imagehandler);
//     if (incorrectGuesses < 8) {
//         guessDisplay.innerHTML = `<p><strong>Guesses: </strong>${incorrectGuesses}/7</p>`;
//         if (incorrectGuesses == 7) {
//             setTimeout(() => {
//                 gameOver("YOU LOSE");
//             }, 2000);
//         }
//         imagehandler = setInterval(() => {
//             imageNumber++;
//             hangmanImage.src = `images/hangman/hangman-0${incorrectGuesses}-${imageNumber%3}.png`;
//         }, 150);
//     }
// }

// function gameOver(message) {
//     clearInterval(imagehandler);
//     wordDisplay.innerHTML = "";
//     guessDisplay.innerHTML = `<p><strong>${message}</strong></p>`;
//     hintDisplay.innerHTML = `<P onclick = "createGame()"><strong>PLAY AGAIN</strong></p>`;
//     buttonsDisplay.innerHTML = "";
// }

// //Create Hint
// function createHint() {
//     hintDisplay.innerHTML = `<p>Hint: ${hint}</p>`;
// }

// //populate create guess work
// function createBlanks() {
//     for(let i in word) {
//         let element = document.createElement("h3");
//         element.innerHTML = (word[i] != "-") ? "_" : "-";
//         element.setAttribute("id", `B${i}`);
//         element.setAttribute("name", word[i]);
//         wordDisplay.appendChild(element);
//         console.log(word[i]);
//     }
// }

// //Create and add button
// function addButton(letter) {
//     //Create an input type dynamically.
//     let element = document.createElement("button");
//     //Assign different attributes to the element.
//     element.textContent = letter;
//     element.setAttribute("id", letter);
//     element.setAttribute("value", letter);
//     element.setAttribute("type", "button");
//     element.setAttribute("name", letter);
//     element.setAttribute("onclick", "guess(this)");
//     //Append the element in page (in span).
//     buttonsDisplay.appendChild(element);
// }

// //Create Game
// function createGame() {
    // hangmanImage.src = "images/hangman/hangman.png";                            //setup
    // let token = getRandomInt(numberOfWords);
    // word = words[token]["word"].toUpperCase();
    // wordLength = word.length;
    // hint = words[token]["hint"];
    // guessDisplay.innerHTML = `<p><strong>Guesses: </strong>0/7</p>`;
    // buttonsDisplay.innerHTML = "";
    // correctGuesses = 0;
    // incorrectGuesses = 0;

//     for (let i = 1; i <= 26; i++) {
//         addButton(String.fromCharCode(64 + i));
//     }

//     //Call function to display spaces for word
//     createBlanks();
//     //Call function to display hint for word
//     createHint();
// }