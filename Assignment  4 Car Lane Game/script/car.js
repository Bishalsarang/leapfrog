

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

    move(isLeft){
        if(this.isPlayer){
            let offset = 29;
            if(isLeft){
                this.x -=  (offset * 2 + LANE_SEPARATOR_WIDTH + CAR_WIDTH);
            }
            else{
                this.x += (offset * 2 + LANE_SEPARATOR_WIDTH + CAR_WIDTH);
            }
        }
       

    }
}