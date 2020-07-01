class Game{
    constructor(container){
        this.canvas = document.querySelector(container);
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;

        this.ctx = this.canvas.getContext('2d');
        this.init();
    }

    init(){
        let that = this;
        let img = new Image();
        img.src = SPRITE_IMG_PATH;
        // this.ctx, imageSmoothingEnabled = true;
        // this.ctx.imageSmoothingQuality = 'high';
        img.onload = function(){
            console.log("Loaded");


            that.ctx.drawImage(img, BACKGROUND_1.sx, BACKGROUND_1.sy, BACKGROUND_1.width, BACKGROUND_1.height, 0, 0, CANVAS_WIDTH , CANVAS_HEIGHT - 10);
            // that.ctx.drawImage(img, BACKGROUND_1.sx, BACKGROUND_1.sy, BACKGROUND_1.width, BACKGROUND_1.height, BACKGROUND_1.width, 0, CANVAS_WIDTH / 2, BACKGROUND_1.height);
            that.ctx.drawImage(img, GROUND.sx, GROUND.sy, GROUND.width, GROUND.height, 0, CANVAS_HEIGHT - GROUND.height, CANVAS_WIDTH, GROUND.height);
       
        }
        
    }
}

game = new Game('canvas');