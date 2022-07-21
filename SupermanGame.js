const resetBtn = document.querySelector("#resetBtn");
const ctx = gameBoard.getContext("2d");
let boardBackground = "lightgrey";
let KryptoniteO;
let KSpeed = 1;

class Superman {
    constructor({x, y}){
        this.coordinate = {
            x, y
        }
        this.width = 80;
        this.height = 80;
    }
}
class Kryptonite {
    constructor({x, y}){
        this.coordinate = {
            x, y
        }
        this.width = 80;
        this.height = 80;
    }
}

let SupermanO = new Superman({x:30, y:200});

gameStart();

function gameStart() {
    running = true;
    drawSuperman();
    createRandomK();
    drawRandomK();
    Step();
}

function Step(){
    if(running){
        setTimeout(()=>{
            clearCanvas();
            moveKryptonite();
            drawRandomK();
            drawSuperman();
            checkKandGameOver();
            Step();
        }, 5)
    }
}

function moveKryptonite(){
    KryptoniteO.coordinate.x-=KSpeed;
}

function clearCanvas(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, 480, 480);
}

function createRandomK(){
    let randNum = Math.floor(Math.random() * 3) + 1;
    const syArray = [0, 160, 320];
    KryptoniteO = new Kryptonite({x: 395, 
    y:(360 - syArray[randNum-1])});
}

function drawRandomK() {
    ctx.strokeStyle = "green";
    ctx.strokeRect(KryptoniteO.coordinate.x, KryptoniteO.coordinate.y, KryptoniteO.width, KryptoniteO.height);
}

function drawSuperman() {
    ctx.strokeStyle = "red";
    ctx.strokeRect(SupermanO.coordinate.x, SupermanO.coordinate.y, 
                    SupermanO.width, SupermanO.height);
}

window.addEventListener("keydown", changeSPosition)
function changeSPosition(event){
    const keyPressed = event.keyCode;
    const UP = 38;
    const DOWN = 40;
    switch(true){
        case(keyPressed == UP && SupermanO.coordinate.y==200):
            SupermanO.coordinate.y = 40;
            break;
        case(keyPressed == UP && SupermanO.coordinate.y==360):
            SupermanO.coordinate.y = 200;
            break;
        case(keyPressed == DOWN && SupermanO.coordinate.y==200):
            SupermanO.coordinate.y = 360;
            break;
        case(keyPressed == DOWN && SupermanO.coordinate.y==40):
            SupermanO.coordinate.y = 200;
            break;
    }
}

function checkKandGameOver(){
    if (((SupermanO.coordinate.x <= KryptoniteO.coordinate.x) && (SupermanO.coordinate.x + SupermanO.width >= KryptoniteO.coordinate.x)
        || ((KryptoniteO.coordinate.x <= SupermanO.coordinate.x) && (KryptoniteO.coordinate.x + KryptoniteO.width >= SupermanO.coordinate.x)))
            && SupermanO.coordinate.y == KryptoniteO.coordinate.y) {
            running = false;
    }
    if (KryptoniteO.coordinate.x + KryptoniteO.width <= 0){
        KSpeed+=0.2;
        createRandomK();
    }
}