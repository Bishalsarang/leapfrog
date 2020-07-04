export class Shape{
    constructor(props){
        let {width=120, height=60, x=100, y=100, angle=0, zIndex=0, fillStyle='blue', context} = props;

        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.angle = angle;

        this.zIndex = zIndex; // Track shape layers

        this.stroke = false;
        this.fill = true;
      

        this.context = context;
        this.context.fillStyle = fillStyle;
    }
    
    draw(){
        if(this.stroke){
            this.context.stroke(this.path);
        }
        else{
            this.context.fill(this.path);
        }
        
    }
}
