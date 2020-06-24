
// CONSTANTS
const CANVAS_WIDTH = '480';
const CANVAS_HEIGHT = '480';
const POINT_SIZE = '10';


function Canvas(canvasWidth, canvasHeight, container){
  /* 
    Constructor function to create a container div
  */
  var that = this;
  this.container = container;
  this.canvas = document.createElement('div')
  this.canvas.setAttribute("id", "canvas");
  this.canvas.style.width = canvasWidth + "px";
  this.canvas.style.height = canvasHeight + "px";
  this.canvas.style.border = "2px solid black";
  this.canvas.style.backgroundColor = "#ded4c5";
  this.canvas.style.position = "relative";
  this.canvas.style.left = 10 + 'px';

  this.getCanvas = function(){
    return that.canvas;
  }

  this.render = function(){
    that.container.appendChild(this.canvas);
  }
}

function Point(x, y, container){
  var that = this;
  this.point = document.createElement("div");
  this.point.setAttribute("class", "point");
  this.point.style.width = POINT_SIZE + "px";
  this.point.style.height = POINT_SIZE + "px";

  this.point.style.left = x + 'px';
  this.point.style.top = y + 'px';
  this.point.style.borderRadius = POINT_SIZE + "px";
  this.point.style.backgroundColor = "#4499CB";
  this.point.style.position = "absolute";
  this.container = container;

  this.getPoint = function(){
    return that.point;
  }

  this.render = function(){
    that.container.appendChild(this.point);
  }

}

var canvas = new Canvas(CANVAS_WIDTH, CANVAS_HEIGHT, document.body)
canvas.render(); // render canvas on DOM

var sampleSize = 100;

for (var i = 0; i < sampleSize; i++) {

  // Generate Random Points
  var x = Math.random() * (CANVAS_WIDTH - POINT_SIZE);
  var y = Math.random() * (CANVAS_HEIGHT - POINT_SIZE);

  var point = new Point(x, y, canvas.getCanvas());
  point.render(); // Render point on DOM
}
