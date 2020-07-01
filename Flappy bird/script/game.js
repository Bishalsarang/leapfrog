class Game{
    constructor(container){
        this.canvas = document.querySelector(container);
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;
        this.canvas.tabIndex = '1'; // Make canvas clickable

        this.ctx = this.canvas.getContext('2d');        
        this.init();
    }

    init(){
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;
        this.canvas.style.padding = 0;
        this.canvas.style.margin = 'auto';
        this.canvas.style.marginTop = '20px';
        this.canvas.style.border = '20px solid grey';
        this.canvas.style.borderBottom = '40px solid grey';
        this.canvas.style.display = 'inline-block';
        this.canvas.style.borderRadius = '12px';
        this.canvas.tabIndex = '1'; // Make canvas clickable

        this.tick = 0;

        this.canvas.addEventListener('keyup', (e) => {
             // Space Key Launches missile
            if (e.keyCode == 32 ) {
                this.player.moveUp();
            }
        });

        this.canvas.addEventListener('click', (e) => {
            console.log("click");
            this.player.moveUp();
        }, false);
        this.sprite = new Image();
        this.sprite.src = SPRITE_IMG_PATH;
        this.loadAssets();
    }

    loadAssets(){
        this.sprite.onload = () => {
            this.startGame();
        }
    }

    startGame(){
        this.player = new Bird(100, 300, this.sprite, this.ctx); 
        this.render();
    }

    drawBackground(){
        this.ctx.drawImage(this.sprite, BACKGROUND.sx, BACKGROUND.sy, BACKGROUND.width, BACKGROUND.height ,0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);    
    }

    drawPlayer(){
        this.player.draw();
    }

    drawScene(){
        this.drawBackground();      
    }

    clearCanvas(width = this.canvas.width, height = this.canvas.height) {
        this.ctx.clearRect(0, 0, width, height);
    }
    
    render(){
        this.tick++;
        
        this.animationId = window.requestAnimationFrame(this.render.bind(this));
        this.clearCanvas();
        this.drawScene();
        if(this.tick % 5 == 0){
            this.player.flap();
        }
        this.player.update();
    }
}

game = new Game('canvas');
