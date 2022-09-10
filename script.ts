const tiles = Array.from(document.getElementsByClassName("tile"));
const turnDisplay : HTMLElement = document.getElementById("turn")!
const X_CLASS : string = "fa-solid fa-x";
const O_CLASS : string = "fa-solid fa-o";
let currentTurn :string = X_CLASS
console.log(tiles);
tiles.forEach((tile : Element) =>{
    tile.innerHTML
    tile.addEventListener("click",(e : Event)=>{
        const target = e.target as Element;
        target.innerHTML =`<i class="${currentTurn}"></i>`;
        console.log(target);
        console.log(currentTurn);
        switchTurn();
    }, {once : true})
});
function switchTurn(){
    currentTurn = currentTurn== X_CLASS?O_CLASS : X_CLASS;
    turnDisplay.innerHTML = currentTurn== X_CLASS?'X' : 'O';
}