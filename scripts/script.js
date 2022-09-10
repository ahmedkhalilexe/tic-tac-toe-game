"use strict";
const tiles = Array.from(document.getElementsByClassName("tile"));
const turnDisplay = document.getElementById("turn");
const X_CLASS = "fa-solid fa-x";
const O_CLASS = "fa-solid fa-o";
let currentTurn = X_CLASS;
console.log(tiles);
tiles.forEach((tile) => {
    tile.innerHTML;
    tile.addEventListener("click", (e) => {
        const target = e.target;
        target.innerHTML = `<i class="${currentTurn}"></i>`;
        console.log(target);
        console.log(currentTurn);
        switchTurn();
    }, { once: true });
});
function switchTurn() {
    currentTurn = currentTurn == X_CLASS ? O_CLASS : X_CLASS;
    turnDisplay.innerHTML = currentTurn == X_CLASS ? 'X' : 'O';
}
