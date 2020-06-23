var CANVAS_WIDTH = "768";
var CANVAS_HEIGHT = "480";
var POINT_SIZE = "10";

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
  point.style.backgroundColor = "#4499CB";
  point.style.position = "absolute";
  canvas.appendChild(point);
  return point;
}

function plot(x, y) {
  var point = createPointElement();
  point.style.left = x + "px";
  point.style.top = y + "px";
}

canvas = drawCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
document.body.appendChild(canvas);

var points = [
  { x: 10, y: 20 },
  { x: 40, y: 40 },
  { x: 60, y: 20 },
  { x: 80, y: 10 },
  { x: 90, y: 70 },
  { x: 120, y: 100 },
  { x: 200, y: 150 },
  { x: 210, y: 200 },
];

for (var point of points) {
  plot(point.x, point.y);
}
