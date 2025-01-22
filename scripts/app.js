
let optionsContainer = document.getElementById("optionsContainer");

let onePlayerRadioBtn = document.getElementById("onePlayerRadioBtn");
let twoPlayerRadioBtn = document.getElementById("twoPlayerRadioBtn");
let mode1RadioBtn = document.getElementById("mode1RadioBtn");
let mode5RadioBtn =document.getElementById("mode5RadioBtn");
let mode7RadioBtn = document.getElementById("mode7RadioBtn");
let startBtn=document.getElementById("startBtn");

let playerContainer = document.getElementById("playerContainer");
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
let nextRoundBtn = document.getElementById("nextRoundBtn");

// moves option btn section --player 1
let p1RockBtn = document.getElementById("p1RockBtn");
let p1PaperdBtn = document.getElementById("p1PaperBtn");
let p1ScissorsdBtn = document.getElementById("p1ScissorsBtn");
let p1LizardBtn =document.getElementById("p1LizardBtn");
let p1SpockBtn = document.getElementById("p1SpockBtn");



// moves option btn section --player 2
let p2RockBtn = document.getElementById("p2RockBtn");
let p2PaperdBtn = document.getElementById("p2PaperBtn");
let p2ScissorsdBtn = document.getElementById("p2ScissorsBtn");
let p2LizardBtn =document.getElementById("p2LizardBtn");
let p2SpockBtn = document.getElementById("p2SpockBtn");


let player1Score=0;
let player2Score =0;
let roundNum =0;
let playerMode ="";
let roundMode = 0;
let winner =""; //round winner
let gameWinner=""; // overall winner
let p1MoveSelected="";
let p2MoveSelected="";

console.log("MODE" + mode1RadioBtn);


async function playCPU(userMove,roundMode){
    const promise =await fetch(`https://rpslscpuresponse-esf0cveehjeedxb4.westus-01.azurewebsites.net/RPSLSGame/RPSLSCPUResponse`);
    const cpuMove= await promise.text();

    console.log("PLAY CPU"+roundNum);
    if (cpuMove)
        {

            //update selected move images
            player1MoveImg.src ="./assets/"+userMove+".png";
            player2MoveImg.src ="./assets/"+cpuMove+".png";
            console.log("PLAYER 1 Image "+player1MoveImg.src);
            console.log("CPU RESPONSE " + cpuMove);
            // Enter checklogic and send cpuResponse
             winner = checkGameLogic(userMove,cpuMove);
            console.log("WINNER IS: "  +winner);

            resetLabelColors();
            //add points
            AddPoints(winner,playerMode);
       
            
            //update round winner label
            if (winner =="player1"){
                roundResultTxt.innerText = "YOU WON THE PREVIOUS ROUND."
                roundResultTxt.classList.add("teal");
            }
            else if (winner=="player2"){
                roundResultTxt.innerText="YOU LOST THE PREVIOUS ROUND."
                roundResultTxt.classList.add("pink");
            }
            else {
                roundResultTxt.innerText="IT'S A TIE, LET'S TRY AGAIN.";
                roundResultTxt.classList.add("gray");
            }
            
            firstMoveTxt.classList.remove("active");
            firstMoveTxt.classList.add("inactive");
            

            movesSelectedSection.classList.remove("inactive");
            movesSelectedSection.classList.add("active");
            let boolGameOver = checkIfGameOver(roundMode,player1Score, player2Score)
            console.log("GAME OVER?"+boolGameOver);

            //if gameover display game winner else display round winner
            if (boolGameOver)
                {
                  //display game winner
                  if (gameWinner=="player1")
                    {
                        gameResultTxt.innerText = "YOU WON THIS GAME!";
                        gameResultTxt.classList.add("teal")

                    }
                    else if (gameWinner == "player2")
                    {
                        gameResultTxt.innerText = "COMPUTER WINS THIS GAME!"
                        gameResultTxt.classList.add("green");
                    }
                    else 
                    {
                        console.log("it's a tie. do not change game result text");
                    }

                 
                //update choose your next move label to Game over.
                gameResultTxt.classList.remove("inactive");    
                gameResultTxt.classList.add("active");
                
                nextMoveOrGameOverTxt.classList.remove("inactive");
                 nextMoveOrGameOverTxt.classList.add("active");
                  nextMoveOrGameOverTxt.innerText="GAME OVER."
                  nextMoveOrGameOverTxt.classList.add("pink");

                  p1MovesBtnSection.classList.add("inactive");
                  p1MovesBtnSection.classList.remove("active");
           
                  roundResultTxt.classList.remove("active");
                  roundResultTxt.classList.add("inactive");
                  roundNumTxt.classList.remove("active");
                  roundNumTxt.classList.add("inactive");
                  playAgainBtn.classList.remove("inactive");
                  playAgainBtn.classList.add("active");

                }
            else
                {  
                    nextMoveOrGameOverTxt.innerText="CHOOSE YOUR NEXT MOVE."
                    
                    roundNumTxt.classList.add("active");
                    roundNumTxt.classList.remove("inactive");
             
                    roundResultTxt.classList.remove("inactive");
                    roundResultTxt.classList.add("active");
                    
                    nextMoveOrGameOverTxt.classList.remove("inactive");
                    nextMoveOrGameOverTxt.classList.add("active");

                    p1MovesBtnSection.classList.remove("inactive");
                    p1MovesBtnSection.classList.add("active");
                    
                    playAgainBtn.classList.remove("active");
                    playAgainBtn.classList.add("inactive");
                    

                }
        
        }
        else{
            console.log("API ERROR not returning CPU response");
        }
        //update Round Count
         UpdateRoundCount(winner,roundMode);
        roundResultTxt.classList.add("bounceIn");
        console.log("PLAYCPU"+roundNum);
}

function playOpponent(player1Move,player2Move){
       //update selected move images
       player1MoveImg.src ="./assets/"+player1Move+".png";
       player2MoveImg.src ="./assets/"+player2Move+".png";
       movesSelectedSection.classList.remove("inactive");
       movesSelectedSection.classList.add("active");
       
        winner= checkGameLogic(player1Move,player2Move);
       resetLabelColors();
       //add points
       AddPoints(winner,playerMode);

       //update winner label 
    if (winner =="player1"){
        roundResultTxt.innerText = "PLAYER 1 WON THIS ROUND."
        roundResultTxt.classList.add("teal");
    }
    else if (winner=="player2"){
        roundResultTxt.innerText="PLAYER 2 WON THIS ROUND"
        roundResultTxt.classList.add("green");
    }
    else {
        roundResultTxt.innerText="IT'S A TIE, LET'S TRY AGAIN.";
        roundResultTxt.classList.add("gray");
    }
    //hide p2 moves section
    player2ChooseMoveTxt.classList.remove("active");
    player2ChooseMoveTxt.classList.add("inactive");
    p2MovesBtnSection.classList.remove("active");
    p2MovesBtnSection.classList.add("inactive");
    
    //check if game over
    let boolGameOver = checkIfGameOver(roundMode,player1Score, player2Score)
    console.log("GAME OVER?"+boolGameOver);

    if (boolGameOver)
        {
          //display game winner
          if (gameWinner=="player1")
            {
                gameResultTxt.innerText = "PLAYER 1 WINS THIS GAME!";
                gameResultTxt.classList.add("teal")

            }
            else if (gameWinner == "player2")
            {
                gameResultTxt.innerText = "PLAYER 2 WINS THIS GAME!"
                gameResultTxt.classList.add("green");
            }
            else 
            {
                console.log("it's a tie. do not change game result text");
            }

         
        //update choose your next button label to Game over.
        gameResultTxt.classList.remove("inactive");    
        gameResultTxt.classList.add("active");
        
        nextMoveOrGameOverTxt.classList.remove("inactive");
        nextMoveOrGameOverTxt.classList.add("active");
        nextMoveOrGameOverTxt.innerText="GAME OVER."
        nextMoveOrGameOverTxt.classList.add("pink");

        p1MovesBtnSection.classList.add("inactive");
        p1MovesBtnSection.classList.remove("active");
   
        roundResultTxt.classList.remove("active");
        roundResultTxt.classList.add("inactive");
        roundNumTxt.classList.remove("active");
        roundNumTxt.classList.add("inactive");
        playAgainBtn.classList.remove("inactive");
        playAgainBtn.classList.add("active");
        
        nextRoundBtn.classList.remove("active");
        nextRoundBtn.classList.add("inactive");

        }
        else // not yet game over
        {  
            nextMoveOrGameOverTxt.innerText="CHOOSE YOUR NEXT MOVE."
            
            roundNumTxt.classList.remove("inactive");
            roundNumTxt.classList.add("active");
     
            roundResultTxt.classList.remove("inactive");
            roundResultTxt.classList.add("active");
            
            nextMoveOrGameOverTxt.classList.add("inactive");
            nextMoveOrGameOverTxt.classList.remove("active");

            
            
            playAgainBtn.classList.remove("active");
            playAgainBtn.classList.add("inactive");
            
            nextRoundBtn.classList.remove("inactive");
            nextRoundBtn.classList.add("active");
        }
  
}


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
            whoWon = "player2";
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
function AddPoints (winner,playerMode){
console.log("PlayerMode: "+playerMode);
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

    // if 2 playermode, update score labels to player 1 and player 2
        if (playerMode=="2Player")
            {
                p1ScoreTxt.innerText = "PLAYER1: "+player1Score;
                p2ScoreTxt.innerText = "PLAYER2: " +player2Score;
            }
  
}
function UpdateRoundCount(winner, roundMode){
    if (winner!="tie"){
    roundNum++;
    console.log("Update Round NUM");
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
function resetLabelColors(){
    roundResultTxt.classList.remove("teal")
    roundResultTxt.classList.remove("green");
    roundResultTxt.classList.remove("gray");
    roundResultTxt.classList.remove("pink");
    nextMoveOrGameOverTxt.classList.remove("pink");
}

function gameReset(){
    player1Score=0;
    player2Score=0;
    roundNum =1;

    resetLabelColors();

    
    roundNumTxt.innerText = "ROUND " + roundNum + " OF " +roundMode;

    p1ScoreTxt.innerText = "YOU: "+player1Score;

    p2ScoreTxt.innerText = "COMPUTER: "+player2Score;

    roundNumTxt.classList.remove("inactive");
    roundNumTxt.classList.add("active");

    roundResultTxt.classList.remove("active");
    roundResultTxt.classList.add("inactive");

    gameResultTxt.classList.remove("active");
    gameResultTxt.classList.add("inactive");

    nextMoveOrGameOverTxt.classList.add("inactive");
    nextMoveOrGameOverTxt.classList.remove("active");

    p1MovesBtnSection.classList.remove("inactive");
    p1MovesBtnSection.classList.add("active");

    playAgainBtn.classList.add("inactive");
    playAgainBtn.classList.remove("active");


    if (playerMode=="2Player")
        {
            p1ScoreTxt.innerText = "PLAYER1: "+player1Score;
            p2ScoreTxt.innerText = "PLAYER2: " +player2Score;
        }
        

}
//once Start button is clicked

//startBtn Event Listener
startBtn.addEventListener('click',function(){
    
  
    //hide game play options container
    optionsContainer.classList.remove("active");
    optionsContainer.classList.add("inactive");

    playerContainer.classList.remove("inactive");
    playerContainer.classList.add("actice");

 

    console.log(`PLayer 1 score ${player1Score}`);
    console.log(`PLayer 2 score ${player2Score}`);

    //check values selected for options (number of player and modes)
     if (onePlayerRadioBtn.checked){
            playerMode = "1Player";
            // show firstmove text
            firstMoveTxt.classList.remove("inactive");
            firstMoveTxt.classList.add("active");

            //hide player 1 and player 2 text
            player1ChooseMoveTxt.classList.remove("active");
            player1ChooseMoveTxt.classList.add("inactive");

            player2ChooseMoveTxt.classList.remove("active");
            player2ChooseMoveTxt.classList.add("inactive");
           
        }
    else if (twoPlayerRadioBtn.checked){
         playerMode="2Player";
         //hide first move text
         firstMoveTxt.classList.remove("active");
         firstMoveTxt.classList.add("inactive");

        //hide player 1 and player 2 text
        player1ChooseMoveTxt.classList.remove("inactive");
        player1ChooseMoveTxt.classList.add("active");
        
        player2ChooseMoveTxt.classList.remove("active");
        player2ChooseMoveTxt.classList.add("inactive");
    
        }
    else
        {
                console.log("No Player mode selected");
        }
        gameReset();

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
        console.log("PlayerMode:"+playerMode);
         

        console.log("exit PLAYER MODE "+roundNum );
        roundNumTxt.innerText = `ROUND ${roundNum} of ${roundMode}`;

        movesSelectedSection.classList.add("inactive");
        movesSelectedSection.classList.remove("active");
     
       
    console.log(roundNum);
}) //end of startBtn event listener


function hideP1MovesBtnsDisplayP2MovesBtns(){
 //hide p1moves btn section
 player1ChooseMoveTxt.classList.remove("active");
 player1ChooseMoveTxt.classList.add("inactive");
 p1MovesBtnSection.classList.remove("active");
 p1MovesBtnSection.classList.add("inactive");

//dispay player 2 moves btn section
player2ChooseMoveTxt.classList.remove("inactive");
player2ChooseMoveTxt.classList.add("active");
p2MovesBtnSection.classList.remove("inactive");
p2MovesBtnSection.classList.add("active");
}
//event listener for P1 moves
p1RockBtn.addEventListener('click',function(){
    if (playerMode=="1Player"){
        //check result based on CPU move
        roundResultTxt.classList.remove("bounceIn");
        playCPU("rock",roundMode);
    } else if (playerMode =="2Player"){
        player1Move="rock";
        hideP1MovesBtnsDisplayP2MovesBtns();
    }

    
})


p1PaperBtn.addEventListener('click',function(){
    if(playerMode=="1Player"){
        roundResultTxt.classList.remove("bounceIn");
        playCPU("paper",roundMode);
    }else if (playerMode =="2Player"){
        player1Move = "paper";
        hideP1MovesBtnsDisplayP2MovesBtns();
    }
})

p1ScissorsdBtn.addEventListener('click',function(){
    if(playerMode=="1Player"){
        roundResultTxt.classList.remove("bounceIn");
        playCPU("scissors",roundMode);
    }else if (playerMode =="2Player"){
        player1Move = "scissors";
        hideP1MovesBtnsDisplayP2MovesBtns();
    }

})

p1LizardBtn.addEventListener('click',function(){
    if(playerMode=="1Player"){
        roundResultTxt.classList.remove("bounceIn");
        playCPU("lizard",roundMode);
    }else if (playerMode =="2Player"){
        player1Move = "lizard";
        hideP1MovesBtnsDisplayP2MovesBtns();
    }
})

p1SpockBtn.addEventListener('click',function(){
    if(playerMode=="1Player"){
        roundResultTxt.classList.remove("bounceIn");
        playCPU("spock",roundMode);
    }else if (playerMode =="2Player"){
        player1Move = "spock";
        hideP1MovesBtnsDisplayP2MovesBtns();
    }
})

//event listener for p2Move
p2RockBtn.addEventListener('click',function(){
    player2Move="rock";
    playOpponent(player1Move,player2Move);
})

p2PaperdBtn.addEventListener('click',function(){
    player2Move="paper";
    playOpponent(player1Move,player2Move);
})
p2ScissorsdBtn.addEventListener('click',function(){
    player2Move="scissors";
    playOpponent(player1Move,player2Move);
})

p2LizardBtn.addEventListener('click',function(){
    player2Move="lizard";
    playOpponent(player1Move,player2Move);
})

p2SpockBtn.addEventListener('click',function(){
    player2Move="spock";
    playOpponent(player1Move,player2Move);
})
//event listener for play again btn
playAgainBtn.addEventListener('click',function(){
   
    playerContainer.classList.remove("active");
    playerContainer.classList.add("inactive");
    
    optionsContainer.classList.remove("inactive");
    optionsContainer.classList.add("active");

    gameReset();
})

nextRoundBtn.addEventListener('click',function(){

      //update Round Count
      UpdateRoundCount(winner,roundMode);
      movesSelectedSection.classList.remove("active");
      movesSelectedSection.classList.add("inactive");

      player1ChooseMoveTxt.classList.remove("inactive");
      player1ChooseMoveTxt.classList.add("active");

      p1MovesBtnSection.classList.remove("inactive");
      p1MovesBtnSection.classList.add("active");   
      
      roundResultTxt.classList.remove("active");
      roundResultTxt.classList.add("inactive");
      nextRoundBtn.classList.remove("active");
      nextRoundBtn.classList.add("inactive");
})