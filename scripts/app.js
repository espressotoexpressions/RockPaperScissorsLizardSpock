
let optionsContainer = document.getElementById("optionsContainer");

let onePlayerRadioBtn = document.getElementById("onePlayerRadioBtn");
let twoPlayerRadioBtn = document.getElementById("twoPlayerRadioBtn");
let mode1RadioBtn = document.getElementById("mode1RadioBtn");
let mode5RadioBtn =document.getElementById("mode5RadioBtn");
let mode7RadioBtn = document.getElementById("mode7RadioBtn");
let startBtn=document.getElementById("startBtn");

let onePlayerContainer = document.getElementById("onePlayerContainer");
let movesSelectedSection =document.getElementById("movesSelectedSection");

//Score and round number section
let p1ScoreTxt = document.getElementById("p1ScoreTxt");
let p2ScoreTxt = document.getElementById("p2ScoreTxt");
let roundNumTxt = document.getElementById("roundNumTxt");

//selected moves section
player1MoveImg=document.getElementById("player1MoveImg");
vsImg =document.getElementById("vsImg");
player2MoveImg=document.getElementById("player2MoveImg");
// game result section
let firstMoveTxt = document.getElementById("firstMoveTxt");
let roundResultTxt = document.getElementById("roundResultTxt");
let gameResultTxt =document.getElementById("gameResultTxt");
let nextMoveOrGameOverTxt = document.getElementById("nextMoveOrGameOverTxt");
let playAgainBtn=document.getElementById("playAgainBtn");

// moves option btn section
let p1RockBtn = document.getElementById("p1RockBtn");
let p1PaperdBtn = document.getElementById("p1PaperBtn");
let p1ScissorsdBtn = document.getElementById("p1ScissorsBtn");
let p1LizardBtn =document.getElementById("p1LizardBtn");
let p1SpockBtn = document.getElementById("p1SpockBtn");



let player1Score=0;
let player2Score =0;
let roundNum =0;
let playerMode ="";
let roundMode = 0;
let gameWinner="";

console.log("MODE" + mode1RadioBtn);


async function playCPU(userMove){
    const promise =await fetch(`https://rpslscpuresponse-esf0cveehjeedxb4.westus-01.azurewebsites.net/RPSLSGame/RPSLSCPUResponse`);
    const cpuMove= await promise.text();
    
    if (cpuMove)
        {
            //update selected move images
            player1MoveImg.src ="./assets/"+userMove+".png";
            player2MoveImg.src ="./assets/"+cpuMove+".png";
            console.log("PLAYER 1 Image "+player1MoveImg.src);
            console.log("CPU RESPONSE " + cpuMove);
            // Enter checklogic and send cpuResponse
            let winner = checkGameLogic(userMove,cpuMove);
            console.log("WINNER IS: "  +winner);
            //add points
            AddPoints(winner);
            //update Round Count
            UpdateRoundCount(winner,roundMode);
            //check if it is game over
            let boolGameOver = checkIfGameOver(roundMode,player1Score, player2Score)
            if (winner =="player1"){
                roundResultTxt.innerText = "YOU WON THIS ROUND!"
                }
            else if (winner=="player2"){
                roundResultTxt.innertext="YOU LOST THIS ROUND!"
                }
            else {
                roundResultTxt.innerHTML="IT'S A TIE, LET'S TRY AGAIN.";
            }

            firstMoveTxt.classList.add("inactive");

            if (boolGameOver)
                {
                  //display game winner
                  if (gameWinner=="player1")
                    {
                        gameResultTxt.innerHTML = "YOU WON THIS GAME!";
                    }
                    else if (gameWinner = "player2")
                    {
                        gameResultTxt.innerHTML = "COMPUTER WINS THIS GAME!"
                    }

                 
                //update choose your next move label to Game over.
                  gameResultTxt.classList.add("active");
                  gameResultTxt.classList.remove("inactive");  
                  nextMoveOrGameOverTxt.innerText="GAME OVER."
                  movesBtnSection.classList.add("inactive");
                  movesBtnSection.classList.remove("active");
                  playAgainBtn.classList.remove("inactive");
                  playAgainBtn.classList.add("active");
                  roundResultTxt.classList.add("inactive");
                  roundNumTxt.classList.add("inactive");

                }
            else
                {
                    roundResultTxt.classList.remove("inactive");
                    roundNumTxt.classList.add("active");
                    roundResultTxt.classList.remove("inactive");
                    roundResultTxt.classList.add("active");
                    nextMoveOrGameOverTxt.classList.remove("inactive");
                    nextMoveOrGameOverTxt.classList.add("active");

                    movesBtnSection.classList.remove("inactive");
                    movesBtnSection.classList.add("active");
                    playAgainBtn.classList.remove("active");
                    playAgainBtn.classList.add("inactive");
                    

                }
        
        }
        else{
            console.log("API ERROR not returning CPU response");
        }
}

// playCPU("spock");




function  checkGameLogic(player1Move,player2Move){

    let whoWon = "none";
    switch (player1Move)
    {
        case "rock":
         switch (player2Move)
         {
            case "rock": 
            whoWon= "tie";
            break;

            case "paper":
            whoWon = "player2";
            break;

            case "scissors":
            whoWon = "player1";
            break;

            case "lizard":
            whoWon = "player1";
            break;

            case "spock":
            whoWon = "player2";
            break;

            default:
            whoWon ="player2 selected an invalid move.";
            break;
         }
        break;

        case "paper":
         switch (player2Move)
         {
            case "rock": 
            whoWon= "player1";
            break;

            case "paper":
            whoWon = "tie";
            break;

            case "scissors":
            whoWon = "player2";
            break;

            case "lizard":
            whoWon = "player2";
            break;

            case "spock":
            whoWon = "player1";
            break;

            default:
            whoWon =" computer selected an invalid move.";
            break;
         }
        break;

        case "scissors":
         switch (player2Move)
         {
            case "rock": 
            whoWon= "player2";
            break;

            case "paper":
            whoWon = "player1";
            break;

            case "scissors":
            whoWon = "tie";
            break;

            case "lizard":
            whoWon = "player1";
            break;

            case "spock":
            whoWon = "Computer Won";
            break;

            default:
            whoWon =" computer selected an invalid move.";
            break;
         }
        break;

         case "lizard":
         switch (player2Move)
         {
            case "rock": 
            whoWon= "player1";
            break;

            case "paper":
            whoWon = "player1";
            break;

            case "scissors":
            whoWon = "player2";
            break;

            case "lizard":
            whoWon = "tie";
            break;

            case "spock":
            whoWon = "player1";
            break;

            default:
            whoWon ="computer selected an invalid move.";
            break;
         }
        break;

         case "spock":
         switch (player2Move)
         {
            case "rock": 
            whoWon= "player1";
            break;

            case "paper":
            whoWon = "player2";
            break;

            case "scissors":
            whoWon = "player1";
            break;

            case "lizard":
            whoWon = "player2";
            break;

            case "spock":
            whoWon = "tie";
            break;

            default:
            whoWon ="player2 selected an invalid move.";
            break;
         }
        break;

        default: 
        whoWon= "player1 selected an invalid move";
        break;
    }

    
    return whoWon;
}
function AddPoints (winner){
    if (winner =="player1")
        {

            player1Score++;
            p1ScoreTxt.innerText = "YOU: "+player1Score;
            
        }
    else if (winner =="player2")
        {

            player2Score++;
            p2ScoreTxt.innerText = "COMPUTER: " +player2Score;
        }
}
function UpdateRoundCount(winner, roundMode){
    if (winner!="tie"){
    roundNum++;
    roundNumTxt.innerText = "ROUND " + roundNum + " OF " +roundMode;

    }
    console.log("ROUND NUM" + roundNum);
}

function checkIfGameOver(mode,player1Score,player2Score)
{ let isGameOver =false;
    switch(mode)
    {
        case 1:
            if (player1Score ==1 ||player2Score==1)
                {
                    if (player1Score ==1)
                        {
                            gameWinner = "player1";
                        }
                    else if (player2Score ==1)
                        {
                            gameWinner="player2";
                        }
                    isGameOver=true;
                }
            break;
        case 5:
            if (player1Score ==3 ||player2Score==3)
                {  if (player1Score ==3)
                    {
                        gameWinner = "player1";
                    }
                else if (player2Score ==3)
                    {
                        gameWinner="player2";
                    }
                isGameOver=true;
                }
            break;
        case 7:
            if (player1Score ==4 ||player2Score ==4)
                {
                    if (player1Score ==4)
                        {
                            gameWinner = "player1";
                        }
                    else if (player2Score ==4)
                        {
                            gameWinner="player2";
                        }
                    isGameOver=true;
                }
            break;

        default:
            break;
    }
    return isGameOver;
}


function gameReset(){
    player1Score=0;
    player2Score=0;
    roundNum =0;
    roundNumTxt.classList.remove("inactive");
   
    roundResultTxt.classList.remove("active");
    roundResultTxt.classList.add("inactive");

    gameResultTxt.classList.remove("active");
    gameResultTxt.classList.add("inactive");

    nextMoveOrGameOverTxt.classList.add("inactive");
    nextMoveOrGameOverTxt.classList.remove("active");

    movesBtnSection.classList.remove("inactive");
    movesBtnSection.classList.add("active");
    playAgainBtn.classList.add("inactive");
    playAgainBtn.classList.remove("active");

}
//once Start button is clicked

//startBtn Event Listener
startBtn.addEventListener('click',function(){
    //hide game play options container
    optionsContainer.classList.remove("active");
    optionsContainer.classList.add("inactive");

    //show oneplayer game container
    onePlayerContainer.classList.remove("inactive");
    onePlayerContainer.classList.add("active");

    gameReset()
    //check values selected for options (number of player and modes)
     if (onePlayerRadioBtn.checked)

        {
            playerMode = "1Player";
        }
        else if (twoPlayerRadioBtn.checked)
        { playerMode="2Player";

            }

     if (mode1RadioBtn.checked){
        roundMode = 1;
        console.log("ROUND MODE 1");
        
     }
    else if (mode5RadioBtn.checked) {
            roundMode=5;
            console.log("ROUND MODE 5");
        }
        else if (mode7RadioBtn.checked)
            {
                roundMode=7;
                console.log("ROUND MODE 7");
            }
    
         
    // call game based on player  and round mode selected
    if (playerMode=="1Player")
        {
           //display One Player UI
           roundNum++;
        }
        else (playerMode =="2Player")
        {
            roundNum++;
        }

        
        roundNumTxt.innerText = "ROUND " + roundNum + " OF " +roundMode;

        movesSelectedSection.classList.add("inactive");
        movesSelectedSection.classList.remove("active");
        roundResultTxt
       
    
}) //end of startBtn event listener

//event listeners for moves buttons

p1RockBtn.addEventListener('click',function(){
    playCPU("rock",roundMode);
})

p1PaperBtn.addEventListener('click',function(){
    playCPU("paper",roundMode);
})

p1ScissorsdBtn.addEventListener('click',function(){
    playCPU("scissors",roundMode);
})

p1LizardBtn.addEventListener('click',function(){
    playCPU("lizard",roundMode);
})

p1SpockBtn.addEventListener('click',function(){
    playCPU("spock",roundMode);
})

//event listener for play again btn
playAgainBtn.addEventListener('click',function(){
   
    onePlayerContainer.classList.remove("inactive");
    optionsContainer.classList.add("active");
    
    onePlayerContainer.classList.remove("active");
    onePlayerContainer.classList.add("inactive");
})
