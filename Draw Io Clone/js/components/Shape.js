
export class Shape{
    constructor(props){
        let {width=120, height=60, x=0, y=0, angle=0, zIndex=0, fillStyle='blue', strokeStyle='green', context} = props;

        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.angle = angle;

        this.zIndex = zIndex; // Track shape layers

        this.isSelected = true;

        this.context = context;

        this.stroke = true;
        this.context.strokeStyle = strokeStyle;

        this.fill = false;
        this.context.fillStyle = fillStyle;

        // Applied transformations
        // Translation
        this.tx = x;
        this.ty = y;

        // Scaling
        this.sx = 2;
        this.sy = 2;
        ;

        // Rotation
    }
    
    translate(){
        this.context.translate(this.tx, this.ty);
    }

    draw(){
        this.context.save();
        this.translate();
        this.context.scale(this.sx, this.sy);
        
       
        if(this.stroke){
            this.context.stroke(this.path);
        }
    
        if(this.fill){
            this.context.fill(this.path);
        }

        if(this.isSelected){
            this.context.fillStyle = CONTROL_BUTTON_FILL_STYLE;
            this.context.fill(this.boundingBox.boundingPath)
        }
       
        
        // UNDO fill style
        this.context.fillStyle = this.fillStyle;
        this.context.restore();
    }

    getPath(){
        return this.path;
    }
}
