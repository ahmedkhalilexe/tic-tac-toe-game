"use strict";
const tiles = Array.from(document.getElementsByClassName("tile"));
const turnDisplay = document.getElementById("turn");
const winnerTextDisplay = document.getElementById("winner");
const winnerContainerDisplay = document.getElementById("winnerContainer");
const resetButton = document.getElementById("reset");
const X_CLASS = "fa-solid fa-x"; //X front fontawesome
const O_CLASS = "fa-solid fa-o"; //O front fontawesome
const X_PLAYER = "X";
const O_PLAYER = "O";
let X_SCORE = document.getElementById("scorex");
let O_SCORE = document.getElementById("scoreo");
let currentTurn = X_CLASS;
let currentPlayer = X_PLAYER;
let winningCombinations = [
    //Rows
    { combo: [0, 1, 2] },
    { combo: [3, 4, 5] },
    { combo: [6, 7, 8] },
    //Columns
    { combo: [0, 3, 6] },
    { combo: [1, 4, 7] },
    { combo: [2, 5, 8] },
    //Diagnal
    { combo: [0, 4, 8] },
    { combo: [2, 4, 6] },
];
//moves list and fill it with null value
let movesList = Array(tiles.length);
movesList.fill(null);
//console.log(tiles);
startGame();
//main game function
function startGame() {
    tiles.forEach((tile) => {
        //removes event listener from previous round
        tile.removeEventListener("click", handleClick);
        //adds eventlistener for current round
        tile.addEventListener("click", handleClick, { once: true });
    });
}
//tile click handler
function handleClick(e) {
    const target = e.target;
    //assign inner html to the current turn(X or O)
    target.innerHTML = `<i class="${currentTurn}"></i>`;
    movesList[Number(target.id)] = currentPlayer; //assign the current player to the right position in the moveslist
    console.log(movesList);
    checkWinning();
    switchTurn();
}
//switches turns
function switchTurn() {
    currentTurn = currentTurn == X_CLASS ? O_CLASS : X_CLASS;
    currentPlayer = currentPlayer == X_PLAYER ? O_PLAYER : X_PLAYER;
    turnDisplay.innerHTML = currentTurn == X_CLASS ? 'X' : 'O';
}
//checks winner
function checkWinning() {
    const isListFull = movesList.every(tile => tile != null);
    for (const winningCombination of winningCombinations) { //loop throght the winning combinations and compare it to the player's moves
        const { combo } = winningCombination;
        const tile1 = movesList[combo[0]];
        const tile2 = movesList[combo[1]];
        const tile3 = movesList[combo[2]];
        if (tile1 != null && tile1 === tile2 && tile1 === tile3) {
            if (tile1 == X_PLAYER) {
                X_SCORE.innerHTML = String(Number(X_SCORE.innerHTML) + 1);
            }
            if (tile1 == O_PLAYER) {
                O_SCORE.innerHTML = String(Number(O_SCORE.innerHTML) + 1);
            }
            gameOverScreen(tile1);
        }
    }
    if (isListFull) {
        gameOverScreen(null);
    }
}
//activate the gameover screen
function gameOverScreen(winner) {
    winnerTextDisplay.innerHTML = "It's Draw!";
    if (winner != null) {
        winnerTextDisplay.innerHTML = `<i class="${currentTurn}"></i> Is The Winner!`;
    }
    winnerContainerDisplay.classList.add("show");
    resetButton.addEventListener("click", () => {
        movesList.fill(null);
        winnerContainerDisplay.classList.remove("show");
        tiles.forEach(tile => {
            tile.innerHTML = "";
            switchTurn();
            startGame();
        });
    });
}
