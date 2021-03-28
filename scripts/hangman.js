document.body.style.backgroundImage = "url('images/hangman/black.jpg')"; 

let words;
let token;
let word;
let hint;
let correctGuesses;
let numberOfWords;
let imagehandler;
let imageNumber = 0;
let guesses = 0;
let hangmanImage = document.getElementById("hangman-image");
let blanks = document.getElementById("blanks");
let buttons = document.getElementById("alphabet");
let guessed = document.getElementById("guesses");


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
    numberOfWords = words.length;
    createGame();
})
.catch(function(){
    console.log("fetch error");
});

//Create Game
function createGame() {
    hangmanImage.src = "images/hangman/hangman.png";
    token = getRandomInt(numberOfWords);
    word = words[token]["word"].toUpperCase();
    hint = words[token]["hint"];
    guessed.innerHTML = `<p><strong>Guesses: </strong>0/7</p>`;
    buttons.innerHTML = "";
    correctGuesses = 0;

    for (let i = 1; i <= 26; i++) {
        addButton(String.fromCharCode(64 + i));
    }

    //Call function to display spaces for word
    createBlanks();
    //Call function to display hint for word
    createHint();
}

//Create guess tracker
function guess(letter) {
    let guessedWrong = true;
    for(let i in word) {
        if(word[i] == letter) {
            document.getElementById(`B${i}`).innerHTML = letter;
            correctGuesses++;
            guessedWrong = false;
        }
    }
    console.log(`${correctGuesses} ${word.length}`);
    if(guessedWrong) hangman();
    if(correctGuesses == word.length()) {
        gameOver("YOU WIN");
    } 
}

//Create hang animation
function hangman() {
    guesses++;
    clearInterval(imagehandler);
    if (guesses < 8) {
        guessed.innerHTML = `<p><strong>Guesses: </strong>${guesses}/7</p>`;
        if (guesses == 7) {
            setTimeout(() => {
                gameOver("YOU LOSE");
            }, 2000);
        }
        imagehandler = setInterval(() => {
            imageNumber++;
            hangmanImage.src = `images/hangman/hangman-0${guesses}-${imageNumber%3}.png`;
        }, 150);
    }
}

function gameOver(message) {
    clearInterval(imagehandler);
    document.getElementById("hint").innerHTML = "";
    blanks.innerHTML = "";
    guessed.innerHTML = `<p><strong>${message}</strong></p>`;
    document.getElementById("hint").innerHTML = `<P onclick = "createGame()"><strong>PLAY AGAIN</strong></p>`;
    buttons.innerHTML = "";
}

//Create Hint
function createHint() {
    document.getElementById("hint").innerHTML = `<p>Hint: ${hint}</p>`;
}

//populate create guess work
function createBlanks() {
    for(let i in word) {
        let element = document.createElement("h3");
        element.innerHTML = (word[i] != "-") ? "_" : "-";
        element.setAttribute("id", `B${i}`);
        element.setAttribute("name", word[i]);
        blanks.appendChild(element);
        console.log(word[i]);
    }
}

//Create and add button
function addButton(letter) {
    //Create an input type dynamically.
    let element = document.createElement("button");
    //Assign different attributes to the element.
    element.textContent = letter;
    element.setAttribute("id", letter);
    element.setAttribute("value", letter);
    element.setAttribute("type", "button");
    element.setAttribute("name", letter);
    element.setAttribute("onclick", "guess(this.textContent); this.hidden = true;");
    //Append the element in page (in span).
    buttons.appendChild(element);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}