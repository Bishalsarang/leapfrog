canvas = document.querySelector('canvas');
canvas.width = 328;
canvas.height = 600;
canvas.style.padding = 0;
canvas.style.margin = 'auto';
canvas.style.display = 'block';

ctx = canvas.getContext('2d');

let y =10;
function drawLane(){

    let animationId = window.requestAnimationFrame(drawLane)

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.setLineDash([10, 30]);
    ctx.lineDashOffset = y++;
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(108, 0);
    ctx.lineTo(108, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(216, 0);
    ctx.lineTo(216, canvas.height);
    ctx.stroke();
}

drawLane();



