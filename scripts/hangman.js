document.body.style.backgroundImage = "url('images/hangman/black.jpg')"; 

let words;
let numberOfWords;

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
    words = data
    numberOfWords = words.length;0=
})
.catch(function(){
    console.log("fetch error");
});

for (let i = 1; i <= 26; i++) {
    addButton(String.fromCharCode(64 + i))
}

function addButton(letter) {
    //Create an input type dynamically.
    let element = document.createElement("button");
    //Assign different attributes to the element.
    element.textContent = letter
    element.setAttribute("id", letter)
    element.setAttribute("value", letter);
    element.setAttribute("type", "button");
    element.setAttribute("name", letter);
    // element.setAttribute("class", "btn btn-secondary btn-lg")
    element.setAttribute("onclick", "console.log(`Button ${this.textContent} was clicked.`)");
    let buttons = document.getElementById("alphabet");
    //Append the element in page (in span).
    buttons.appendChild(element);
}

//populate word with random word from words.
let letter = 'A'
$("#word").append(`<h3>${letter}<h3>`)
letter = 'P'
$("#word").append(`<h3>${letter}<h3>`)