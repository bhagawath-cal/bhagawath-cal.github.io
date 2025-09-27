let particles = [];
const numParticles = 100;
let bodyStyle; // To hold the computed style of the body

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    let canvasContainer = document.getElementById('p5-canvas-container');
    canvas.parent(canvasContainer);
    
    bodyStyle = getComputedStyle(document.body);

    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    // Read the background color from the CSS variable
    let bgColor = bodyStyle.getPropertyValue('--bg-color');
    background(bgColor);

    // Determine particle/line color based on the theme
    let isLightTheme = document.body.getAttribute('data-theme') === 'light';
    let particleColor = isLightTheme ? color(0, 150) : color(255, 150);
    let lineColor = isLightTheme ? 0 : 255;

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].display(particleColor);

        for (let j = i + 1; j < particles.length; j++) {
            let distance = dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            if (distance < 150) {
                let alpha = map(distance, 0, 150, 200, 0);
                stroke(lineColor, alpha);
                line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            }
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class Particle {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.vx = random(-0.5, 0.5);
        this.vy = random(-0.5, 0.5);
        this.radius = 3;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    display(pColor) {
        noStroke();
        fill(pColor);
        ellipse(this.x, this.y, this.radius * 2);
    }
}