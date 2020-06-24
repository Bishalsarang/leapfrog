
function Canvas(canvasWidth=300, canvasHeight=300, backgroundColor="#ded4c5", container=document.body){
  /* 
    Constructor function to create a container div
  */
  let that = this;
  this.container = container;
  this.canvas = document.createElement('div')
  this.canvas.setAttribute("id", "canvas");
  this.canvas.style.width = canvasWidth + "px";
  this.canvas.style.height = canvasHeight + "px";
  this.canvas.style.border = "2px solid black";
  this.canvas.style.backgroundColor = backgroundColor;
  this.canvas.style.position = "relative";
  this.canvas.style.display = "inline-block";
  this.canvas.style.margin = 10 + "px";

  this.getCanvas = function(){
    return this.canvas;
  }

  this.render = function(){
    this.container.appendChild(this.canvas);
  }
}

function Point(x, y, pointSize, speed, container){
  let that = this;
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.point = document.createElement("div");
  this.pointSize = pointSize;
  
  this.point.setAttribute("class", "point");
  this.point.style.width =   this.pointSize + "px";
  this.point.style.height =   this.pointSize + "px";

  this.point.style.left = x + 'px';
  this.point.style.top = y + 'px';
  this.point.style.borderRadius =   this.pointSize + "px";
  this.point.style.backgroundColor = "#4499CB";
  this.point.style.position = "absolute";
  this.container = container;
  this.canvasHeight = window.getComputedStyle(container).getPropertyValue('height');
  console.log(this.canvasHeight);

  this.getPoint = function(){
    return this.point;
  }

  this.render = function(){
    this.container.appendChild(this.point);
  }

  this.animate = function(){
    let parity = 1;
    function step(){
      
      window.requestAnimationFrame(step);
      
      if (that.y <= 0) {
        parity = 1;
      } else if (that.y + parseFloat(that.pointSize) >= parseFloat(that.canvasHeight)) {
        parity = -1;
      }
      that.y += parity * that.speed;
      that.point.style.top = that.y + 'px';
    }
    
    window.requestAnimationFrame(step);
  }

}

canvases = [
  {
    width: '400',
    height: '400',
    bgColor: '#e7e5e5',
    ballSize: '30',
    speed: 6,
  },
  {
    width: '400',
    height: '300',
    bgColor: "#7be0ad",
    ballSize: '15',
    speed: 5,
  },
  {
    width: '200',
    height: '200',
    bgColor: "#e0b0d5",
    ballSize: '10',
    speed: 1,
  },
  {
    width: '100',
    height: '400',
    bgColor: "#AFECE7",
    ballSize: '15',
    speed: 1,
  },
  {
    width: '400',
    height: '300',
    bgColor: "#706C61",
    ballSize: '70',
    speed: 9,
  },
  {
    width: '200',
    height: '200',
    bgColor: "#e0b0d5",
    ballSize: '20',
    speed: 2,
  },
  {
    width: '400',
    height: '400',
    bgColor: "#F78E69",
    ballSize: '35',
    speed: 1,
  }
]

canvases.forEach(function(canvas){
  /*
  Construct canvases on DOM from the list of canvases
  */
  let {width, height, bgColor, ballSize, speed} = canvas;
  let canvasElement = new Canvas(width, height, bgColor, document.body)
  canvasElement.render(); // render canvas on DOM

  let x = width / 2, y = 0;

  let ball = new Point(x, 0, ballSize, speed, canvasElement.getCanvas());
  ball.render();
  ball.animate();
}
);
