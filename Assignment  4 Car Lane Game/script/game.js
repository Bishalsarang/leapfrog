
canvas = document.querySelector('canvas');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.style.padding = 0;
canvas.style.margin = 'auto';
canvas.style.display = 'block';

ctx = canvas.getContext('2d');

let speed =10;

let player = new Car(isPlayer=true);
let opponent_1 = new Car();
let opponent_2 = new Car();
let opponent_3 = new Car();

console.log(opponent_1);
function drawLane(){

    let animationId = window.requestAnimationFrame(drawLane)

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.setLineDash([40, ]);
    ctx.lineDashOffset = (speed += 5);
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

    player.draw();
    opponent_1.draw();
    opponent_2.draw();
    opponent_3.draw();
}



drawLane();

window.addEventListener('keydown', (e)=>{
    console.log("key press");
        // Left arrow
        if(e.keyCode == 37){
            console.log('left');
            player.move(left=true);

        }
        // right arrow
        else if(e.keyCode == 39){
            console.log('right');
            player.move(false);

        }
        console.log(player.x, player.y);
    });

