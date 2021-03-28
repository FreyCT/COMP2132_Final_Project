document.body.style.backgroundImage = "url('images/hangman/black.jpg')"; 

let words;
let token;
let word;
let hint;
let numberOfWords;
let blanks = document.getElementById("blanks");


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

for (let i = 1; i <= 26; i++) {
    addButton(String.fromCharCode(64 + i))
}

//Create Game
function createGame() {
    token = getRandomInt(numberOfWords);
    word = words[token]["word"].toUpperCase();
    hint = words[token]["hint"];

    //Call function to display spaces for word
    createBlanks();
    //Call function to display hint for word
}

//Create guess tracker
function guess(letter) {
    let flag = true;
    console.log(blanks.childElementCount);
    for(let i in word) {
        console.log(`hello ${i} ${word} ${word[i]} ${letter}`);
        if(word[i] == letter) {
            console.log("matched")
            document.getElementById(`B${i}`).innerHTML = letter;
            flag = false;
        }
    }
}

//Create hang animation

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
    element.setAttribute("onclick", "guess(this.textContent)");
    let buttons = document.getElementById("alphabet");
    //Append the element in page (in span).
    buttons.appendChild(element);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}