export class BoundingBox{
    constructor(props) {
        let {x1, x2, x3, y1, y2, y3} = props;
        this.boundingPath = new Path2D();

        
        this.boundingPath.moveTo(x1, y1);
        
        this.boundingPath.arc(x1, y1, CONTROL_BUTTON_WIDTH, 0, 360);
        this.boundingPath.lineTo(x2, y1);

        this.boundingPath.moveTo(x2, y1);
        this.boundingPath.arc(x2, y1, CONTROL_BUTTON_WIDTH, 0, 360);

        this.boundingPath.moveTo(x3, y1);
        this.boundingPath.arc(x3, y1, CONTROL_BUTTON_WIDTH, 0, 360);

        this.boundingPath.moveTo(x1, y2);
        this.boundingPath.arc(x1, y2, CONTROL_BUTTON_WIDTH, 0, 360);

        this.boundingPath.moveTo(x3, y2);
        this.boundingPath.arc(x3, y2, CONTROL_BUTTON_WIDTH, 0, 360);

        this.boundingPath.moveTo(x1, y3);
        this.boundingPath.arc(x1, y3, CONTROL_BUTTON_WIDTH, 0, 360);

        this.boundingPath.moveTo(x2, y3);
        this.boundingPath.arc(x2, y3, CONTROL_BUTTON_WIDTH, 0, 360);

        this.boundingPath.moveTo(x3, y3);
        this.boundingPath.arc(x3, y3, CONTROL_BUTTON_WIDTH, 0, 360);
    }
}