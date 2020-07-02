let canvas = document.querySelector('canvas');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
let ctx = canvas.getContext('2d');

let tick = 0;
let beginX = 50;
let beginY = 50;
let speed = 0.2;

function draw() {
	let rowOffset = 0;
	let phase = tick * speed;
	for (let strand = 0; strand < 2; strand++) {
		strandPhase = phase + strand * Math.PI;

		for (let col = 0; col < NUM_COLUMNS; col++) {
			x = beginX + col * OFFSET;
			rowOffset = (col * 2 * Math.PI) / (NUM_COLUMNS * 2);
			for (let row = 0; row < NUM_ROWS; row++) {
				let y = beginY + row * OFFSET + Math.sin(strandPhase + rowOffset) * 25;
				let circleRadius =
					(Math.cos(strandPhase - row * 0.1 + rowOffset) + 1) *
					0.5 *
					MAX_RADIUS;
				let circle = new Circle(x, y, circleRadius, ctx);
				circle.draw();
			}
		}
	}
}

function drawBackground() {
	ctx.fillStyle = '#043a4a';
	ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function clearCanvas() {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function animate() {
	tick++;
	clearCanvas();
	drawBackground();
	draw();
	animationId = window.requestAnimationFrame(animate);
}

let animationId = window.requestAnimationFrame(animate);
