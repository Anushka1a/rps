console.log('this is rps game');

let userMove = '';
let computerMove = '';
let result = '';
let gameNumber = 0;

const gameSummary = {
    wins: 0,
    ties: 0,
    losses:0,
    gamesPlayed: 0
};
let gameHistory = [];

function captureUserMove(move){
    userMove = move; 
    console.log(`User move is ${userMove}`); 
}

function generateComputerMove(){
    const randNum = Math.random();
    if (randNum <= 1/3){
        computerMove = 'Rock';
    } else if (randNum <= 2/3){
        computerMove = 'Paper';
    } else {
        computerMove = 'Scissors';
    }
    console.log(`Computer move is ${computerMove}`);
}

function evaluateMoves(){
    if (userMove === "Rock"){
        if(computerMove === "Rock"){
            result = 'Tie';
        } else if (computerMove === "Paper"){
            result = 'Lose';
        }else {
            result = 'Win';
        }
    }else if (userMove === "Paper"){
        if(computerMove === "Rock"){
            result = 'Win';
        } else if (computerMove === "Paper"){
            result = 'Tie';
        }else {
            result = 'Lose';
        }   
    }else {
        if(computerMove === "Rock"){
            result = 'Lose';
        } else if (computerMove === "Paper"){
            result = 'Win';
        }else {
            result = 'Tie';
        }
    }
    console.log(`result is ${result}`);
    return result; 
}

function updateGameState(){
    gameSummary.gamesPlayed += 1;
    if (result === "Win"){
        gameSummary.wins += 1;
    } else if (result === "Tie"){
        gameSummary.ties += 1;
    } else {
        gameSummary.losses += 1;
    }
    const game = {
        gameNumber,
        userMove : userMove,
        computerMove,
        result 
    };
    gameHistory.push(game);
    gameNumber += 1;
}

function resetGame(){
    gameSummary.wins = 0;
    gameSummary.ties = 0;
    gameSummary.losses = 0;
    gameSummary.gamesPlayed = 0;
    gameHistory = [];
    gameNumber = 0;
    renderGameSummary();

    const gameHistoryTableElement = document.getElementById('gameHistory');
    while (gameHistoryTableElement.rows.length > 1){
        gameHistoryTableElement.deleteRow(1);
    }
}


function renderGameSummary(){
    const winsElement = document.getElementById('wins');
    winsElement.innerHTML = gameSummary.wins;

    const tiesElement = document.getElementById('ties');
    tiesElement.innerHTML = gameSummary.ties;

    const lossesElement = document.querySelector('#losses');
    lossesElement.innerHTML = gameSummary.losses;

    const gamesPlayedElement = document.getElementById('gamesPlayed');
    gamesPlayedElement.innerHTML = gameSummary.gamesPlayed;
}

function renderGameHistoryOpt(){
    const newRow = document.createElement("tr");
    newRow.insertCell().textContent = gameNumber;
    newRow.insertCell().textContent = userMove;
    newRow.insertCell().textContent = computerMove;
    newRow.insertCell().textContent = result;
    const gameHistoryTableElement = document.getElementById('gameHistory');
    gameHistoryTableElement.appendChild(newRow);
}

function playGame(userMove){
    captureUserMove(userMove);
    generateComputerMove();
    evaluateMoves();
    updateGameState();
    renderGameSummary();
    renderGameHistoryOpt();
}