let font;
let points = [];
const textToDisplay = "Bhagawath";

function preload() {
  font = loadFont("https://raw.githubusercontent.com/google/fonts/main/ofl/sharetechmono/ShareTechMono-Regular.ttf");
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvas-container");
  textFont(font);
  textSize(200);
  const bounds = font.textBounds(textToDisplay, 0, 0, 200);
  const x = (width - bounds.w) / 2;
  const y = (height + bounds.h) / 2;
  points = font.textToPoints(textToDisplay, x, y, 200, {
    sampleFactor: 0.2
  });
}

function draw() {
  clear();
  noStroke();
  fill(0, 255, 195, 200);
  for (let pt of points) {
    const d = dist(mouseX, mouseY, pt.x, pt.y);
    const radius = map(d, 0, 150, 10, 1);
    circle(pt.x, pt.y, radius);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setup();
}
