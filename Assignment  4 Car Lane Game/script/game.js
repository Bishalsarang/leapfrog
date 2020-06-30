canvas = document.querySelector('canvas');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.style.padding = 0;
canvas.style.margin = 'auto';
canvas.style.display = 'block';

ctx = canvas.getContext('2d');

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
			// console.log('collisions');
			// console.log(car, carList[0]);
		}
		car.draw();
	});

	if(missile) missile.draw();
}

let animationId = 0;
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

drawLane();

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
    if(e.key === "Enter"){
        console.log("enter");
        missile = new Missile(carList[0]);
    }

	// console.log(player.x, player.y);
});
