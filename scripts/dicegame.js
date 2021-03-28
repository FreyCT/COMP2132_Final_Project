



const player = document.getElementsByClassName('dice-image')[0]
player.style.opacity = 0

const computer = document.getElementsByClassName('dice-image')[1]
computer.style.opacity = 0



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
        $(".roll").eq(rollNumber).text(playerRandomNumber)
        computerRoll()


        if(roundTallyPlayer.length == 2){
            roundTallyPlayer = []
            roundTallyPlayer.push(playerRandomNumber)
            console.log( roundTallyPlayer )
        }else{
            roundTallyPlayer.push(playerRandomNumber)
            console.log( roundTallyPlayer )
        }
        if(roundTallyPlayer.length == 2){
            let result = 0
            if(roundTallyPlayer[0] == roundTallyPlayer[1]){
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
        $(`.roll`).eq(rollNumber).text(computerRandomNumber)
        rollDice.style.display = 'block'

        if(roundTallyComputer.length == 2){
            roundTallyComputer = []
            roundTallyComputer.push(computerRandomNumber)
            console.log( roundTallyComputer )
        }else{
            roundTallyComputer.push(computerRandomNumber)
            console.log( roundTallyComputer )
        }
        if(roundTallyComputer.length == 2){
            let computerResult = 0
            if(roundTallyComputer[0] == roundTallyComputer[1]){
                computerResult = (roundTallyComputer[0] + roundTallyComputer[1])*2
            }else{
                computerResult = roundTallyComputer[0] + roundTallyComputer[1]
            }
            $(".points").eq(roundNumber + 1).text(computerResult)
            roundNumber += 2
        }
    }, 500);

};



numberOfPoints = document.getElementsByClassName("points")
let totalPlayerScore = document.getElementById("totalPlayerScore")
let totalComputerScore = document.getElementById("totalComputerScore")



emptyPoints = 0
for (i = 0; i<numberOfPoints.length; i++){
    if("points" == numberOfPoints[i].innerHTML){
        console.log(numberOfPoints[i].innerHTML)
        emptyPoints ++
    }
}


if(emptyPoints == 0){
    totalPlayerScore.innerHTML = "hello"
    totalComputerScore.innerHTML = "hello"
}

