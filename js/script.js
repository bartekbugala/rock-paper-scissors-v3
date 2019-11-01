'use strict';
const params = {
    scorePlayer: 0,
    scoreComputer: 0,
    roundCounter: 0,
    roundsToWin: 0,
    gameOver: false,
    gameOverInfo: false,
    gameOverMsg: '',
    youWonMsg: ' won this round!',
    youLostMsg: ' lost this round!',
    playerName: 'Player',
    computerName: 'Computer',
    tieMsg: 'It\'s a tie!',
    youPlayedMsg: ' played: ',
    computerPlayedMsg: ' played: ',
    playerWinMsg: ' won the game!',
    computerWinMsg: ' won the game!',
    infiniteStartMsg: 'Game Started. Infinite play.',
    wrongInputMsg: 'Wrong input, please enter a positive number.<br><br>Infinite play.',
    newGameMsg: 'New game started. To win the game you need to win ',
    gameOverOnBtnMsg: 'Game over, please press the New Game button!',
    moves: {
        rock: 'rock',
        paper: 'paper',
        scissors: 'scissors'
    },
    progress: []
}
let progressCollumnNames = {
    roundsPlayed: 'Rounds Played',
    playerMove: 'Player Move',
    computerMove: 'Computer Move',
    roundWinner: 'Round Winner',
    currentScore: 'Score',
}

const resultDiv = document.getElementById('result');

const modalOverlay = document.querySelector('#modal-overlay');
const finalModalContent = document.querySelector('#modal-final .content');
const finalModal = document.querySelector('#modal-final');
const inputModal = document.querySelector('#modal-input');

const roundsNumber = document.getElementById('rounds-number');
const moveButtons = document.getElementsByClassName('player-move');
const btnNewGame = document.getElementById('button-new-game');
const btnStart = document.getElementById('button-start');
const outputDiv = document.getElementById('output');
const inputStart = document.getElementById('rounds-to-win');
const inputPlayerName = document.getElementById('player-name');



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

function checkWinner(playerChoice) {
    if (!params.gameOver) {
        let resultMessage = playerMove(playerChoice);
        updateLineMsg(outputDiv, resultMessage);
        updateResultMsg();
    }
    if (params.roundsToWin === 0) {
        return;
    }
    showGameOverMessage();
    return;
}

function showGameOverMessage() {

    if (params.scorePlayer === params.roundsToWin) {
        params.gameOver = true;
        params.gameOverMsg = wrapWithSpan(params.playerName + params.playerWinMsg, 'player');
        showFinalModal();
        return;
    }
    if (params.scoreComputer === params.roundsToWin) {
        params.gameOver = true;
        params.gameOverMsg = wrapWithSpan(params.playerName + params.computerWinMsg, 'computer');
        showFinalModal();
        return;
    }
}

function showFinalModal() {
    modalOverlay.classList.add('show');
    finalModal.classList.add('show');
    finalModalContent.innerHTML = params.gameOverMsg;
    finalModalContent.innerHTML += '<div class="table-wrapper">' + generateGameScoreTable(params.progress, progressCollumnNames) + '</div>';
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
    return spanExpression = '<span id="' + spanID + '">' + textInsideSpan + '</span>';
}

function singleWinMsg(playerChoice, computerChoice, wonLostMsg) {
    return params.playerName + params.youPlayedMsg + wrapWithSpan(playerChoice) + ' ' + params.computerName + params.computerPlayedMsg + wrapWithSpan(computerChoice) + '<br>' + wonLostMsg;
}

function playerMove(playerChoice) {
    let computerChoice = randomOf3();

    let winMsg = wrapWithSpan(params.playerName + params.youWonMsg, 'player');
    let looseMsg = wrapWithSpan(params.playerName + params.youLostMsg, 'computer');
    let tieMsg = wrapWithSpan(params.tieMsg, false);

    params.roundCounter++;
    if (playerChoice === computerChoice) {
        addGameScoreEntry(playerChoice, computerChoice, params.tieMsg)
        return singleWinMsg(playerChoice, computerChoice, tieMsg);
    } else if ((playerChoice === params.moves.rock && computerChoice === params.moves.paper) || (playerChoice === params.moves.scissors && computerChoice === params.moves.rock) || (playerChoice === params.moves.paper && computerChoice === params.moves.scissors)) {
        params.scoreComputer++;
        addGameScoreEntry(playerChoice, computerChoice, params.computerName);
        return singleWinMsg(playerChoice, computerChoice, looseMsg);
    }
    params.scorePlayer++;
    addGameScoreEntry(playerChoice, computerChoice, params.playerName);
    return singleWinMsg(playerChoice, computerChoice, winMsg);
}

function addGameScoreEntry(playerChoice, computerChoice, winner) {
    return params.progress.push({
        [progressCollumnNames.roundsPlayed]: params.roundCounter,
        [progressCollumnNames.playerMove]: playerChoice,
        [progressCollumnNames.computerMove]: computerChoice,
        [progressCollumnNames.roundWinner]: winner,
        [progressCollumnNames.currentScore]: params.scorePlayer + ' - ' + params.scoreComputer
    });
}

function updateLineMsg(domElement, textToDisplay) {
    domElement.innerHTML = textToDisplay;
}

function addLineMsg(domElement, textToDisplay) {
    domElement.innerHTML = domElement.innerHTML + '<br><br>' + textToDisplay;
}

function updateResultMsg() {
    resultDiv.innerHTML = '<span>' + params.scorePlayer + '</span>' + ' - ' + '<span>' + params.scoreComputer + '</span>';
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
        checkWinner(move);
    }
}

function resetGame(displayedRoundsToWin, startMessage) {
    if (displayedRoundsToWin === undefined) {
        displayedRoundsToWin = '∞';
    }
    params.scorePlayer = 0;
    params.scoreComputer = 0;
    params.gameOver = false;
    params.gameOverInfo = false;
    updateResultMsg();
    updateLineMsg(outputDiv, startMessage);
    updateLineMsg(roundsNumber, displayedRoundsToWin);
}

btnStart.addEventListener('click', function (event) {
    event.preventDefault();
    params.playerName = inputPlayerName.value || 'Player';
    progressCollumnNames.playerMove = params.playerName + '\'s Move';
    progressCollumnNames.computerMove = params.computerName + '\'s Move';
    params.roundsToWin = parseInt(inputStart.value);
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
inputStart.addEventListener('keydown', function (event) {
    // Code 13 = Enter
    if (event.keyCode === 13) {
        event.preventDefault();
        btnStart.click();
    }
});

addEventListeners();


