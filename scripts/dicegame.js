



const player = document.getElementsByClassName('dice-image')[0]
player.style.opacity = 0

const computer = document.getElementsByClassName('dice-image')[1]
computer.style.opacity = 0



const rollDice = document.getElementById('btn-roll')


let imagehandler;
let imageNumber = 1;
let rollNumber = 0
maxImageNumber = 6;

const interval = 100;


rollDice.addEventListener('click', function(){
    player.style.opacity = 1
    rollNumber ++

    imagehandler = setInterval(() => {
        imageNumber ++;
        player.src = `images/dice/dice-${imageNumber%maxImageNumber + 1}.png`;
        
    }, interval);

    setTimeout(() => {
        clearInterval(imagehandler);
        computerRoll()
        let playerRandomNumber = Math.floor(Math.random() * 6)+1
        player.src = `images/dice/dice-${playerRandomNumber}.png`;
    }, 3000);

});


function computerRoll(){

    computer.style.opacity = 1

    imagehandler = setInterval(() => {
        imageNumber ++;
        computer.src = `images/dice/dice-${imageNumber%maxImageNumber + 1}.png`;
        
    }, interval);

    setTimeout(() => {
        clearInterval(imagehandler);
        let computerRandomNumber = Math.floor(Math.random() * 6)+1
        computer.src = `images/dice/dice-${computerRandomNumber}.png`;
    }, 3000);

};







// {
//     imageNumber += 1
//     player.src = `images/dice/dice-${imageNumber}.png`

//     // setTimeout(function(){
//     //     requestAnimationFrame(rollDiceImage)
//     // }, 100);


// }