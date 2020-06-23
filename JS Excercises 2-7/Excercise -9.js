var CANVAS_WIDTH = "768";
var CANVAS_HEIGHT = "480";
var POINT_SIZE = "50";

// Create and draw canvas
function drawCanvas(canvasWidth, canvasHeight) {
  var canvas = document.createElement("div");
  canvas.setAttribute("id", "canvas");
  canvas.style.width = canvasWidth + "px";
  canvas.style.height = canvasHeight + "px";
  canvas.style.border = "2px solid black";
  canvas.style.backgroundColor = "#ded4c5";

  canvas.style.position = "relative";
  canvas.style.left = "100px";
  canvas.style.top = "100px";
  return canvas;
}

function createPointElement() {
  var point = document.createElement("div");
  point.setAttribute("class", "point");
  point.style.width = POINT_SIZE + "px";
  point.style.height = POINT_SIZE + "px";
  point.style.borderRadius = POINT_SIZE + "px";
  point.style.margin = "0 auto";
  point.style.backgroundColor = "#4499CB";
  point.style.position = "absolute";
  canvas.appendChild(point);
  return point;
}

function plot(x, y) {
  point.style.left = x + "px";
  point.style.top = y + "px";
}

canvas = drawCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
document.body.appendChild(canvas);

var point = createPointElement();

startX = CANVAS_WIDTH / 2;
startY = 0;

var parity = 1;
var x = startX,
  y = startY;

setInterval(function () {
  if (y <= startY) {
    parity = 1;
  } else if (y + parseFloat(POINT_SIZE) >= CANVAS_HEIGHT) {
    parity = -1;
  }
  y += parity;
  plot(x, y);
}, 100 / 60);
