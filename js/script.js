'use strict'
const resultDiv = document.getElementById('result');
const roundsNumber = document.getElementById('rounds-number');
const btnRock = document.getElementById('button-rock');
const btnPaper = document.getElementById('button-paper');
const btnScissors = document.getElementById('button-scissors');
const btnStart = document.getElementById('button-start');
const outputDiv = document.getElementById('output');
const moves = { rock: 'ROCK', paper: 'PAPER', scissors: 'SCISSORS' }
const inputStart = document.getElementById('rounds-to-win');

let resultPlayer = 0;
let resultComputer = 0;
let roundsToWin;
let gameOver = false;
let gameOverInfo = false;
let gameOverMsg = '';

function randomOf3() {
    let randomNumber = Math.floor((Math.random() * 3) + 1);
    const computerMoves = { 1: moves.rock, 2: moves.paper, 3: moves.scissors };
    return computerMoves[randomNumber];
}

function playerMove(playerChoice) {
    if (!gameOver) {
        let resultMessage = checkWinner(playerChoice);
        updateLineMsg(outputDiv, resultMessage);
        updateResultMsg();
    }
    if (resultPlayer === roundsToWin) {
        gameOver = true;
        gameOverMsg = wrapWithSpan('YOU WON THE ENTIRE GAME!', 'player');
        return addLineMsg(outputDiv, gameOverMsg);
    }
    if (resultComputer === roundsToWin) {
        gameOver = true;
        gameOverMsg = wrapWithSpan('COMPUTER WON THE ENTIRE GAME!', 'computer');
        return addLineMsg(outputDiv, gameOverMsg);
    }
    return;
}

function wrapWithSpan(textInsideSpan, spanID) {
    let spanExpression;
    if (spanID === false) {
        spanExpression = '<span>' + textInsideSpan + '</span>';
        return spanExpression;
    }
    if (spanID === undefined) {
        spanID = textInsideSpan.toLowerCase()
        spanExpression = '<span id="' + spanID + '">' + textInsideSpan + '</span>';
        return spanExpression;
    }
    spanExpression = '<span id="' + spanID + '">' + textInsideSpan + '</span>';
    return spanExpression;
}

function singleWinMsg(playerChoice, computerChoice, wonLostMsg) {
    return wonLostMsg + 'You played: ' + wrapWithSpan(playerChoice) + ', Computer played: ' + wrapWithSpan(computerChoice);
}

function checkWinner(playerChoice) {
    let computerChoice = randomOf3();

    let winMsg = wrapWithSpan('YOU WON!', 'player');
    let looseMsg = wrapWithSpan('YOU LOST', 'computer');
    let tieMsg = wrapWithSpan('TIE!', false);

    if (playerChoice === computerChoice) {
        return singleWinMsg(playerChoice, computerChoice, tieMsg);
    } else if ((playerChoice === moves.rock && computerChoice === moves.paper) || (playerChoice === moves.scissors && computerChoice === moves.rock) || (playerChoice === moves.paper && computerChoice === moves.scissors)) {
        resultComputer++;
        return singleWinMsg(playerChoice, computerChoice, looseMsg);
    }
    resultPlayer++;
    return singleWinMsg(playerChoice, computerChoice, winMsg);
}

function updateLineMsg(domElement, textToDisplay) {
    domElement.innerHTML = textToDisplay;
}

function addLineMsg(domElement, textToDisplay) {
    domElement.innerHTML = domElement.innerHTML + '<br><br>' + textToDisplay;
}

function updateResultMsg() {
    resultDiv.innerHTML = '<span>' + resultPlayer + '</span>' + ' - ' + '<span>' + resultComputer + '</span>';
}

function gameOverMessageOnButton() {
    if (gameOverInfo === true) {
        return;
    }
    gameOverInfo = true;
    let msg = 'Game over, please press the New Game button!';
    addLineMsg(outputDiv, msg);
}

function handleBtnClick(move) {
    return function () {
        if (gameOver) {
            gameOverMessageOnButton();
            return;
        }
        playerMove(move);
    }
}
function resetGame(roundsToWin,startMessage){
    if(roundsToWin===undefined){
        roundsToWin = '∞';
    }
    resultPlayer = 0;
    resultComputer = 0;
    gameOver = false;
    gameOverInfo = false;
    updateResultMsg();
    updateLineMsg(outputDiv, startMessage);
    updateLineMsg(roundsNumber, roundsToWin);
}

btnStart.addEventListener('click', function (event) {
    event.preventDefault();
    roundsToWin = parseInt(inputStart.value);
    inputStart.value = roundsToWin;
    if (roundsToWin === null) {
        return;
    }
    roundsToWin = parseInt(roundsToWin);
    if (isNaN(roundsToWin) || roundsToWin < 0) {
        roundsToWin = undefined;
        
        resetGame(roundsToWin,'Wrong input, please enter a positive number.<br><br>Infinite play.');
        return;       
    }
    if (roundsToWin === 0) {
        roundsToWin = undefined;
        resetGame(roundsToWin,'Game Started. Infinite play.');
        return;
    }
    resetGame(roundsToWin,'New game started. To win the game you need to win '+roundsToWin+' rounds.');
});

// Figure Buttons
btnRock.addEventListener('click', handleBtnClick(moves.rock));
btnPaper.addEventListener('click', handleBtnClick(moves.paper));
btnScissors.addEventListener('click', handleBtnClick(moves.scissors));