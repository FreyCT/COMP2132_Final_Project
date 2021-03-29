

let btnRestart = document.getElementById('btn-restart')
btnRestart.addEventListener('click', function(){
    if(window.confirm("Are you sure you want to restart the game?")){
        location.reload();
    }
})

const player = document.getElementsByClassName('dice-image')[0]
player.style.opacity = 0

const computer = document.getElementsByClassName('dice-image')[1]
computer.style.opacity = 0

let PlayerDiceResult = document.getElementsByClassName('dice-result')[0]
let ComputerDiceResult = document.getElementsByClassName('dice-result')[1]




const rollDice = document.getElementById('btn-roll')


let imagehandler;
let imageNumber = 1;
let rollNumber = 0;
let roundNumber = 0
let roundTallyPlayer = []
let roundTallyComputer = []

maxImageNumber = 6;

const interval = 100;


rollDice.addEventListener('click', function(){
    player.style.opacity = 1
    if(rollNumber != 0){
        rollNumber ++
    }

    imagehandler = setInterval(() => {
        imageNumber ++;
        player.src = `images/dice/dice-${imageNumber%maxImageNumber + 1}.png`;
        rollDice.style.display = 'none'
    }, interval);

    setTimeout(() => {
        clearInterval(imagehandler);    //original main intention
        let playerRandomNumber = Math.floor(Math.random() * 6)+1
        player.src = `images/dice/dice-${playerRandomNumber}.png`;
        PlayerDiceResult.innerHTML = `Dice result: ${playerRandomNumber}`
        $(".roll").eq(rollNumber).text(playerRandomNumber)
        computerRoll()


        if(roundTallyPlayer.length == 2){
            roundTallyPlayer = []
            roundTallyPlayer.push(playerRandomNumber)
        }else{
            roundTallyPlayer.push(playerRandomNumber)
        }
        if(roundTallyPlayer.length == 2){
            let result = 0
            if((roundTallyPlayer[0] == 1 || roundTallyPlayer[1]) == 1){
                playerResult = 0
            }else if(roundTallyPlayer[0] == roundTallyPlayer[1]){
                result = (roundTallyPlayer[0] + roundTallyPlayer[1])*2
            }else{
                result = roundTallyPlayer[0] + roundTallyPlayer[1]
            }
            $(".points").eq(roundNumber).text(result)
        }
        
    }, 500);


});


function computerRoll(){
    rollNumber ++
    computer.style.opacity = 1

    imagehandler = setInterval(() => {
        imageNumber ++;
        computer.src = `images/dice/dice-${imageNumber%maxImageNumber + 1}.png`;
    }, interval);

    setTimeout(() => {
        clearInterval(imagehandler);
        let computerRandomNumber = Math.floor(Math.random() * 6)+1
        computer.src = `images/dice/dice-${computerRandomNumber}.png`;
        ComputerDiceResult.innerHTML = `Dice result: ${computerRandomNumber}`
        $(`.roll`).eq(rollNumber).text(computerRandomNumber)
        rollDice.style.display = 'block'

        if(roundTallyComputer.length == 2){
            roundTallyComputer = []
            roundTallyComputer.push(computerRandomNumber)
        }else{
            roundTallyComputer.push(computerRandomNumber)
        }
        if(roundTallyComputer.length == 2){
            let computerResult = 0
            if((roundTallyComputer[0] == 1 || roundTallyComputer[1]) == 1){
                computerResult = 0
            }else if(roundTallyComputer[0] == roundTallyComputer[1]){
                computerResult = (roundTallyComputer[0] + roundTallyComputer[1])*2
            }else{
                computerResult = roundTallyComputer[0] + roundTallyComputer[1]
            }
            $(".points").eq(roundNumber + 1).text(computerResult)
            roundNumber += 2
        }
        checkPoints()
    }, 500);

    

};



let numberOfPoints = document.getElementsByClassName("points")
let totalPlayerScore = document.getElementById("totalPlayerScore")
let totalComputerScore = document.getElementById("totalComputerScore")

function checkPoints(){
    let emptyPoints = numberOfPoints.length
    for (i = 0; i<numberOfPoints.length; i++){
        if("points" != numberOfPoints[i].innerHTML){
            emptyPoints -= 1
        }
    }

    if(emptyPoints == 0){
        totalPlayerScore.innerHTML = parseInt($(".points").eq(0).text()) + parseInt($(".points").eq(2).text()) + parseInt($(".points").eq(4).text())
        totalComputerScore.innerHTML = parseInt($(".points").eq(1).text()) + parseInt($(".points").eq(3).text()) + parseInt($(".points").eq(5).text())
        rollDice.style.display = 'none'
        announceWinner()
    }
}


function announceWinner(){
    setTimeout(() => {
        if(totalPlayerScore.innerHTML > totalComputerScore.innerHTML){
            if(window.confirm("You won, would you like to play again?")){
                location.reload();
            }
        }
        if(totalPlayerScore.innerHTML < totalComputerScore.innerHTML){
            if(window.confirm("You lost, would you like to play again?")){
                location.reload();
            }
        }
        if(totalPlayerScore.innerHTML == totalComputerScore.innerHTML){
            if(window.confirm("You tied, would you like to play again?")){
                location.reload();
            }
        }

    }, 1500)
}
