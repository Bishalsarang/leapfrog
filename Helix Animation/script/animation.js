let tick = 0;


let canvas = document.querySelector('canvas');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
let ctx = canvas.getContext('2d');


let beginX = 10;
let beginY = 10;

// let circle = new Circle(1 * beginX, 1 * beginY, 10,ctx);
// circle.draw();

// circle = new Circle(1 * beginX, 2 * beginY + MAX_RADIUS, 10,ctx, "green");
// circle.draw();


// circle = new Circle(1 * beginX, 3 * beginY + 2 * MAX_RADIUS, 10,ctx, "green");
// circle.draw();

function draw(){
    for(let i = 0; i < 2; i++){
        for(let j = 0; j < 2; j++){
            // console.log("hshshs")
            let x = (i + 1) * beginX + i * MAX_RADIUS + OFFSET;
            let y = (j + 1) * beginY + j * MAX_RADIUS + OFFSET;
            console.log(x, y);
            let circle = new Circle(x, y, MAX_RADIUS,ctx);
            circle.draw();
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
    if(tick % 9000 == 0){
       
    }
    animationId = window.requestAnimationFrame(animate);
}



let animationId = window.requestAnimationFrame(animate);