

class Car{
    constructor(isPlayer=false){
        this.x = 141;
        this.y = 508;
        this.isPlayer = isPlayer;
        this.imageSrc = isPlayer ? PLAYER_IMG_PATH: OPPONENT_IMG_PATH;
        this.img = new Image();
        this.img.src = PLAYER_IMG_PATH;
    }

    draw(){
        if(this.isPlayer){

        }
        else{

        }
       
        ctx.drawImage(this.img, this.x, this.y);
    }

    isInsideBoundary(x){
        return x >= 0 && x < CANVAS_WIDTH;
    }

    move(isLeft){
        if(this.isPlayer){
            let offset = 29;
            let nextX = 0;
            if(isLeft){
                nextX = this.x -  (offset * 2 + LANE_SEPARATOR_WIDTH + CAR_WIDTH);
            }
            else{
                nextX = this.x + (offset * 2 + LANE_SEPARATOR_WIDTH + CAR_WIDTH);
            }
            if(this.isInsideBoundary(nextX)){
                this.x = nextX;
            }
        }
       

    }
}