canvas = document.querySelector('canvas');
canvas.width = 328;
canvas.height = 600;
canvas.style.padding = 0;
canvas.style.margin = 'auto';
canvas.style.display = 'block';

ctx = canvas.getContext('2d');

let speed =10;

let car1 = new Car();
function drawLane(){

    let animationId = window.requestAnimationFrame(drawLane)

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.setLineDash([10, 30]);
    ctx.lineDashOffset = speed++;
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(108, 0);
    ctx.lineTo(108, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(216, 0);
    ctx.lineTo(216, canvas.height);
    ctx.stroke();

    car1.draw();
}



drawLane();

window.addEventListener('keydown', (e)=>{
    console.log("key press");
        // Left arrow
        if(e.keyCode == 37){
            console.log('left');
            car1.x -= 80;

        }
        // right arrow
        else if(e.keyCode == 39){
            console.log('right');
            car1.x += 80;

        }
    });

