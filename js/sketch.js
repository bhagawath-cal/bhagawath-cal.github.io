// sketch.js
let font;
let points = [];
let bounds;
const textToDisplay = "Bhagawath";

function preload() {
  font = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.ttf');
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-container');
  textFont(font);
  textSize(200);
  bounds = font.textBounds(textToDisplay, 0, 0, 200);
  const x = (width - bounds.w) / 2;
  const y = (height + bounds.h) / 2;
  points = font.textToPoints(textToDisplay, x, y, 200, {
    sampleFactor: 0.15,
    simplifyThreshold: 0
  });
  background(0);
}

function draw() {
  clear();
  noStroke();
  for (let pt of points) {
    let d = dist(mouseX, mouseY, pt.x, pt.y);
    let radius = map(d, 0, 100, 10, 1);
    fill(0, 255, 195, map(d, 0, 150, 255, 50));
    ellipse(pt.x, pt.y, radius, radius);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setup();
}