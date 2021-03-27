document.body.style.backgroundImage = "url('images/hangman/black.jpg')"; 

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
    element.setAttribute("class", "btn btn-secondary btn-lg")
    element.setAttribute("onclick", "console.log(`Button ${this.textContent} was clicked.`)");

    let buttons = document.getElementById("alphabet");
    //Append the element in page (in span).  
    buttons.appendChild(element);
}

// $.getJSON( "json/words.json", function( data ) {
//     console.log(data);
// })

if(localStorage) {
        
    // Retrieve data
    const retrievedJSON  = JSON.parse(localStorage.getItem("user_data")); 
    //access JSON data
    console.log(retrievedJSON);
} else {
    alert("Sorry, your browser do not support local storage.");
}

let letter = 'A'
$("#word").append(`<h3>${letter}<h3>`)
letter = '_'
$("#word").append(`<h3>${letter}<h3>`)
