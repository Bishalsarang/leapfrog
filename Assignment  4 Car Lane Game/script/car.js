

class Car{
    constructor(isPlayer){
        this.x = 140;
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
}