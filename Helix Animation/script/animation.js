let canvas = document.querySelector('canvas');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
let ctx = canvas.getContext('2d');

let tick = 0;
let beginX = 50;
let beginY = 50;

function draw(){
    let colOffset = 0;
    let phase = tick * 0.2;
    for(let strand = 0; strand < 2; strand++){
        strandPhase = phase + strand * Math.PI;
        x = beginX;
        for (let col = 0; col < NUM_COLUMNS; col++) {        
            x = x + 2 * MAX_RADIUS;
            colOffset = col / MAX_RADIUS;
            for (let row = 0; row < NUM_COLUMNS; row++) {
              let y = beginY + row * 10  + (Math.sin(strandPhase + colOffset) + 1) * 30;
              let sizeOffset = (Math.cos(strandPhase + colOffset) + 1) * 0.3;
              let circleRadius = sizeOffset * MAX_RADIUS;
              let circle = new Circle(x, y, circleRadius, ctx);
              circle.draw();
            }
          }
}
}

function drawBackground(){
    ctx.fillStyle = '#043a4a';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function clearCanvas(){
     ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function animate(){
    tick++;
    clearCanvas();
    drawBackground();
    draw();
    animationId = window.requestAnimationFrame(animate);
}



let animationId = window.requestAnimationFrame(animate);