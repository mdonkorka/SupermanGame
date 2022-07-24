const resetBtn = document.querySelector("#resetBtn");
const score = document.querySelector("#currentScore");
const highScore = document.querySelector("#highScore");
const ctx = gameBoard.getContext("2d");
const backgroundImg = new Image();
const supermanImg = new Image();
const kryptoniteImg = new Image();
backgroundImg.src = 'Images/StarBackgroundCropped.png';
supermanImg.src = 'Images/SupermanImg.png';
kryptoniteImg.src = 'Images/KryptoniteImg.png';

let KryptoniteO;
let KSpeed = 1;
let scoreVal = 0;
let running = false;
let myId;
let SupermanO;

class Superman {
    constructor({x, y}){
        this.coordinate = {
            x, y
        }
        this.width = 114;
        this.height = 74;
    }
}
class Kryptonite {
    constructor({x, y}){
        this.coordinate = {
            x, y
        }
        this.width = 66;
        this.height = 74;
    }
}

if ((document.cookie.indexOf('highscore=') == -1)) {
    document.cookie = "highscore=0; 604800000; path=/";
}

resetBtn.addEventListener("click", resetGame); //reset Button
window.addEventListener("keydown", changeSPosition);

//START GAME
gameStart();

function gameStart() {
    running = true;
    highScore.textContent = `High Score: ${getHCookie()}`;
    score.textContent = "Current Score: 0";
    SupermanO = new Superman({x:30, y:200});
    drawSuperman();
    createRandomK();
    drawRandomK();
    Step();
}

function Step(){
    if(running){
        myId = setTimeout(()=>{
            clearCanvas();
            moveKryptonite();
            drawRandomK();
            drawSuperman();
            checkKandGameOver();
            Step();
        }, 1)
    }
}

function moveKryptonite(){
    KryptoniteO.coordinate.x-=KSpeed;
}

function drawBG(){
    ctx.drawImage(
        backgroundImg, 0, 0
    )
}

function clearCanvas(){
    drawBG();
}

function createRandomK(){
    let randNum = Math.floor(Math.random() * 3) + 1;
    const syArray = [0, 160, 320];
    KryptoniteO = new Kryptonite({x: 395, 
    y:(360 - syArray[randNum-1])});
}

function drawRandomK() {
    ctx.drawImage(kryptoniteImg, KryptoniteO.coordinate.x, KryptoniteO.coordinate.y);
}

function drawSuperman() {
    ctx.drawImage(supermanImg, SupermanO.coordinate.x, SupermanO.coordinate.y);
    }

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

function getHCookie(){
    let HCookieDecoded = decodeURIComponent(document.cookie); //gets all cookies
    CookieArray = HCookieDecoded.split("="); //split cookie in to array at = sign
    return CookieArray[CookieArray.length-1]; //gets last value in array
}

function highScoreF(scoreVal){
    if (scoreVal > getHCookie()){
        document.cookie = `highscore=${scoreVal}; 604800000; path=/`;
    }
}

function checkKandGameOver(){
    if (((SupermanO.coordinate.x <= KryptoniteO.coordinate.x) && (SupermanO.coordinate.x + SupermanO.width >= KryptoniteO.coordinate.x)
        || ((KryptoniteO.coordinate.x <= SupermanO.coordinate.x) && (KryptoniteO.coordinate.x + KryptoniteO.width >= SupermanO.coordinate.x)))
            && SupermanO.coordinate.y == KryptoniteO.coordinate.y) {
            highScoreF(scoreVal);
            running = false;
    }
    if (KryptoniteO.coordinate.x + KryptoniteO.width <= 0){
        KSpeed+=0.2;
        scoreVal += 1;
        score.textContent = `Current Score: ${scoreVal}`;
        createRandomK();
    }
}

function resetGame(){
    clearInterval(myId);
    scoreVal = 0;
    KSpeed = 1;
    gameStart();
}