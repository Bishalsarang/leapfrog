
import {Shape} from './Shape.js';

export class Card extends Shape{
    constructor(props){
        super(props);  
        this.x = 90;
        this.makePath();
        

    }

    makePath(){
        this.path = new Path2D('M 4 0 L 10 0 L 10 10 l -10 0 l 0 -6 z ');
    }
 
}

