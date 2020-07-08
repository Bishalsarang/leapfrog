import {Shape} from './Shape.js';
import {BoundingBox} from './BoundingBox.js'

export class Rectangle extends Shape{
    constructor(props){
        super(props);  
        this.path = new Path2D();
        this.boundingBox = new BoundingBox({x1: 0, x2: this.width / 2, x3: this.width, y1: 0, y2: this.height / 2, y3: this.height});
        this.makePath();
    }

    makePath(){
        this.path.rect(0, 0, this.width, this.height);
    }
 
}

