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
        // this.canvas.style.border = '20px solid grey';
        // this.canvas.style.borderBottom = '40px solid grey';
        this.canvas.style.display = 'inline-block';
        this.canvas.style.borderRadius = '12px';
        this.canvas.tabIndex = '1'; // Make canvas clickable

        this.tick = 0;
        this.pipesList = []
        this.resetGameStates();

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
        this.ground = new Ground(0, CANVAS_HEIGHT - GROUND.height, this.sprite, this.ctx);
        this.render();
    }

    drawBackground(){
        this.ctx.drawImage(this.sprite, BACKGROUND.sx, BACKGROUND.sy, BACKGROUND.width, BACKGROUND.height ,0, 0, CANVAS_WIDTH, CANVAS_HEIGHT - GROUND.height);    
        // this.ctx.drawImage(this.sprite, GROUND.sx, GROUND.sy, GROUND.width, GROUND.height ,0, CANVAS_HEIGHT - GROUND.height, CANVAS_WIDTH, GROUND.height);
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
    
    hitsTopOrBottom(){
        if(this.player.y + this.player.width > CANVAS_HEIGHT - GROUND.height + 11){
            return true;
        }
        if(this.player.y < 0){
            return true;
        }
    }

    resetGameStates(){
        this.isStartScreen = true;
        this.isGameOver = false;
        this.isGameRunning = true;
    }
    
    getRandomInt(maxm, minm = 0) {
        return Math.floor(Math.random() * (maxm - minm) + minm);
    }
    
    generatePipes(){
        let height1 = this.getRandomInt(140, 50);
        let height2 = CANVAS_HEIGHT - height1 - this.player.height - 60;
        this.pipesList.push(new Pipe(height1, height2, "", this.ctx, this.sprite));
        console.log(this.pipesList);
        
    }

    drawPipes(){
        for(let i = 0; i < this.pipesList.length; i++){
            this.pipesList[i].draw();
        }
    }
 
    render(){
        this.tick++;
        this.animationId = window.requestAnimationFrame(this.render.bind(this));
        if(this.isGameRunning){
            this.clearCanvas();
            this.drawScene();
            this.drawPipes();
            if(this.hitsTopOrBottom()){
                this.isGameOver = true;
                this.isGameRunning = false;
                this.isGameRunning = false;
                console.log("Game over");
            }
            // Flap wings every 5 ticks
            if(this.tick % 5 == 0){
                this.player.flap();
            }

            if(this.tick % 120 == 0){
                this.generatePipes();
            }

            this.ground.draw();
            this.player.update();
        } 
    }
}

game = new Game('canvas');
