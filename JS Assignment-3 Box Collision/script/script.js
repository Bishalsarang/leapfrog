function getRandomCoordinates(topLeftX, topLeftY, canvasWidth, canvasHeight){
 
}

let canvas = document.querySelector('canvas');
canvas.width = 100;
canvas.height = 100;

let totalNumberOfBalls = 10;
let ballList = []

for(let i = 0; i < totalNumberOfBalls; i++){
    ball = new Ball(50, 50, 10, "red");
    ballList.push(ball);
}

console.log(ballList);

function draw(){
    
    let cx = canvas.getContext('2d');
    cx.fillStyle = 'red';
    cx.beginPath();
    cx.arc(50, 50, 40, 0, 360);
    cx.fill();
}

draw()