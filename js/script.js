'use strict'
const params = {
    resultPlayer: 0,
    resultComputer: 0,
    roundsToWin: undefined,
    gameOver: false,
    gameOverInfo: false,
    gameOverMsg: '',
    youWonMsg: 'YOU WON!',
    youLostMsg: 'YOU LOST',
    tieMsg: 'TIE!',
    youPlayedMsg:'You played: ',
    computerPlayedMsg:', Computer played: ',
    playerWinMsg: 'YOU WON THE ENTIRE GAME!',
    computerWinMsg: 'COMPUTER WON THE ENTIRE GAME!',
    infiniteStartMsg: 'Game Started. Infinite play.',
    wrongInputMsg: 'Wrong input, please enter a positive number.<br><br>Infinite play.',
    newGameMsg: 'New game started. To win the game you need to win ',
    gameOverOnBtnMsg: 'Game over, please press the New Game button!',
    moves: {
        rock: 'rock',
        paper: 'paper',
        scissors: 'scissors'
    }
}

const resultDiv = document.getElementById('result');
const roundsNumber = document.getElementById('rounds-number');
const moveButtons = document.getElementsByClassName('player-move');
const btnStart = document.getElementById('button-start');
const outputDiv = document.getElementById('output');
const inputStart = document.getElementById('rounds-to-win');

function addEventListeners() {
    for (let i = 0; i < moveButtons.length; i++) {
        moveButtons[i].addEventListener('click', handleBtnClick(moveButtons[i].getAttribute('data-move')));
    }
}

function randomOf3() {
    let randomNumber = Math.floor((Math.random() * 3) + 1);
    const computerMoves = { 1: params.moves.rock, 2: params.moves.paper, 3: params.moves.scissors };
    return computerMoves[randomNumber];
}

function playerMove(playerChoice) {
    if (!params.gameOver) {
        let resultMessage = checkWinner(playerChoice);
        updateLineMsg(outputDiv, resultMessage);
        updateResultMsg();
    }
    if (params.resultPlayer === params.roundsToWin) {
        params.gameOver = true;
        params.gameOverMsg = wrapWithSpan(params.playerWinMsg, 'player');
        return addLineMsg(outputDiv, params.gameOverMsg);
    }
    if (params.resultComputer === params.roundsToWin) {
        params.gameOver = true;
        params.gameOverMsg = wrapWithSpan(params.computerWinMsg, 'computer');
        return addLineMsg(outputDiv, params.gameOverMsg);
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
    return wonLostMsg + params.youPlayedMsg + wrapWithSpan(playerChoice) + params.computerPlayedMsg + wrapWithSpan(computerChoice);
}

function checkWinner(playerChoice) {
    let computerChoice = randomOf3();

    let winMsg = wrapWithSpan(params.youWonMsg, 'player');
    let looseMsg = wrapWithSpan(params.youLostMsg, 'computer');
    let tieMsg = wrapWithSpan(params.tieMsg, false);

    if (playerChoice === computerChoice) {
        return singleWinMsg(playerChoice, computerChoice, tieMsg);
    } else if ((playerChoice === params.moves.rock && computerChoice === params.moves.paper) || (playerChoice === params.moves.scissors && computerChoice === params.moves.rock) || (playerChoice === params.moves.paper && computerChoice === params.moves.scissors)) {
        params.resultComputer++;
        return singleWinMsg(playerChoice, computerChoice, looseMsg);
    }
    params.resultPlayer++;
    return singleWinMsg(playerChoice, computerChoice, winMsg);
}

function updateLineMsg(domElement, textToDisplay) {
    domElement.innerHTML = textToDisplay;
}

function addLineMsg(domElement, textToDisplay) {
    domElement.innerHTML = domElement.innerHTML + '<br><br>' + textToDisplay;
}

function updateResultMsg() {
    resultDiv.innerHTML = '<span>' + params.resultPlayer + '</span>' + ' - ' + '<span>' + params.resultComputer + '</span>';
}

function gameOverMessageOnButton() {
    if (params.gameOverInfo === true) {
        return;
    }
    params.gameOverInfo = true;
    addLineMsg(outputDiv, params.gameOverOnBtnMsg);
}

function handleBtnClick(move) {
    return function () {
        if (params.gameOver) {
            gameOverMessageOnButton();
            return;
        }
        playerMove(move);
    }
}

function resetGame(roundsToWin, startMessage) {
    if (roundsToWin === undefined) {
        // Not params.roundsToWin!
        roundsToWin = '∞';
    }
    params.resultPlayer = 0;
    params.resultComputer = 0;
    params.gameOver = false;
    params.gameOverInfo = false;
    updateResultMsg();
    updateLineMsg(outputDiv, startMessage);
    updateLineMsg(roundsNumber, roundsToWin);
}

btnStart.addEventListener('click', function (event) {
    event.preventDefault();
    params.roundsToWin = parseInt(inputStart.value);
    inputStart.value = params.roundsToWin;
    if (params.roundsToWin === null) {
        return;
    }
    params.roundsToWin = parseInt(params.roundsToWin);
    if (isNaN(params.roundsToWin) || params.roundsToWin < 0) {
        params.roundsToWin = undefined;

        resetGame(params.roundsToWin, params.wrongInputMsg);
        return;
    }
    if (params.roundsToWin === 0) {
        params.roundsToWin = undefined;
        resetGame(params.roundsToWin, params.infiniteStartMsg);
        return;
    }
    resetGame(params.roundsToWin, params.newGameMsg + params.roundsToWin + ' rounds.');
});

// Enter = btnStart
inputStart.addEventListener('keydown', function(event) {
    // Code 13 = Enter
    if (event.keyCode === 13) {
      event.preventDefault();
      btnStart.click();
    }
}); 

addEventListeners();


