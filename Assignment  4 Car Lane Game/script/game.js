canvas = document.querySelector('canvas');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.style.padding = 0;
canvas.style.margin = 'auto';
canvas.style.display = 'block';

ctx = canvas.getContext('2d');

let isStartScreen = true;
let gameRunning = false;
let gameOver = false;

class Game{

}



carList = [];

let speed = 10;

let player = new Car((isPlayer = true));
carList.push(player);

let n = 0;
setInterval(function () {
	if (n < 3) {
		n++;
		let opponent = new Car();
		carList.push(opponent);
	}
}, 1000);

let missile;

function drawCharacters() {
	carList.forEach((car, index) => {
		if (index != 0 && car.doesCollide(carList[0])) {

		}
		car.draw();
	});

	if(missile) missile.draw();
}

let animationId = 0;

function drawStartScreen(){
    ctx.fillStyle = '#6C8EAD';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = 'bold 30px Arial';
    ctx.textAlign = 'center';
    ctx. textBaseline = 'middle';
    ctx.fillStyle = 'white';  
    ctx.fillText('CAR LANE RACE', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 5); 
    ctx.font = 'italic 24px Georgia';
    ctx.fillText('Instructions: ', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 3 ); 
    ctx.font = 'italic 13px Georgia';
    ctx.fillText('A: Use left and right arrow key to move left or right', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 3 + 24); 
    ctx.fillText('B: Press Space to fire the bullet', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 3 + 48); 
    ctx.font = 'bold 20px Arial';
    ctx.fillText('Press "Enter" to start the game', CANVAS_WIDTH / 2, CANVAS_HEIGHT  - 200); 

}

function drawLane() {
	animationId = window.requestAnimationFrame(drawLane);

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.setLineDash([40]);
	ctx.lineDashOffset = -(speed += 5);
	ctx.strokeStyle = 'white';
	ctx.lineWidth = LANE_SEPARATOR_WIDTH;
	ctx.beginPath();
	ctx.moveTo(106, 0);
	ctx.lineTo(106, canvas.height);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(217, 0);
	ctx.lineTo(217, canvas.height);
	ctx.stroke();
	drawCharacters();
}

// drawLane();

drawStartScreen()
let isRunning = true;
window.addEventListener('keydown', (e) => {
	// console.log('key press');
	if (isRunning && (e.keyCode == 37 || e.keyCode == 39)) {
		// Check Collision detection
		// Left arrow
		if (e.keyCode == 37) {
			// console.log('left');
			player.move((left = true));
		}
		// right arrow
		else if (e.keyCode == 39) {
			// console.log('right');
			player.move(false);
		}
    }
    if(isStartScreen && e.key === "Enter"){
        console.log("enter");
        isStartScreen = false;
        drawLane();
        
    }
    if(isRunning && e.keyCode == 32){
        console.log("Space");
        missile = new Missile(carList[0]);
    }

	// console.log(player.x, player.y);
});
