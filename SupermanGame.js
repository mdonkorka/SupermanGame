const resetBtn = document.querySelector("#resetBtn");
const ctx = gameBoard.getContext("2d");

class Superman {
    constructor({x, y}){
        this.position = {
            x, y
        }
        this.width = 80;
        this.height = 80;
    }
}

class Kryptonite {
    constructor({x, y}){
        this.position = {
            x, y
        }
        this.width = 80;
        this.height = 80;
    }
}

const SupermanO = new Superman({x:30, y:200});

let randNum = Math.floor(Math.random() * 3) + 1;
syArray = [0, 160, 320];
360 - syArray[randNum-1];
let KryptoniteO = new Kryptonite({x: 395, 
    y:(360 - syArray[randNum-1])});

gameStart();

function gameStart() {
    drawSuperman();
    drawRandomK();
}

function drawSuperman() {
    ctx.strokeStyle = "red";
    ctx.strokeRect(SupermanO.position.x, SupermanO.position.y, 
                    SupermanO.width, SupermanO.height);
}

function drawRandomK() {
    ctx.strokeStyle = "green";
    ctx.strokeRect(KryptoniteO.position.x, KryptoniteO.position.y, 80, 80);
}
/*
function moveKryptonite() {
    let timerId = setInterval(kFrame, 5);

    function kFrame(){
        if(KryptoniteX<=-80){
            clearInterval(timerId);
        }
        else{
            KryptoniteX-=1;
        }
    }
}
*/

//A const declaration does not mean that the value of the variable cannot be changed. It just means that the variable identifier cannot be reassigned.