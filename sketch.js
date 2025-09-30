let particles = [];
const numParticles = 250;
let bodyStyle;

let animationMode = 1;

// Function for the wand button to cycle animations
function cycleBackgroundAnimation() {
    animationMode = (animationMode % 6) + 1;
}

// Function for the dropdown to set a specific animation
function setAnimationMode(mode) {
    animationMode = parseInt(mode);
}

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    let canvasContainer = document.getElementById('p5-canvas-container');
    canvas.parent(canvasContainer);
    
    bodyStyle = getComputedStyle(document.body);

    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
}

// UPDATED: The draw function's logic is reordered for a better flow
function draw() {
    let bgColor = bodyStyle.getPropertyValue('--bg-color').trim();
    background(bgColor ? bgColor : [18, 18, 18]);

    let isLightTheme = document.body.getAttribute('data-theme') === 'light';
    let particleColor = isLightTheme ? color(0, 150) : color(255, 150);
    let lineColor = isLightTheme ? 0 : 255;

    for (let i = 0; i < particles.length; i++) {
        
        // --- UPDATED ANIMATION ORDER ---
        if (animationMode === 4) {
            particles[i].jitter();      // 4. Brownian Motion
        } else if (animationMode === 5) {
            particles[i].orbit();       // 5. Orbital Vortex
        } else if (animationMode === 6) {
            particles[i].rain();        // 6. Falling Stars
        } else { 
            // Modes 1, 2, and 3 all use the base 'update' motion
            particles[i].update();
            if (animationMode === 3) {
                // 3. Interactive Field (adds mouse interaction)
                particles[i].interact();
            }
        }

        particles[i].display(particleColor);

        // Draw connecting lines ONLY for Mode 2
        if (animationMode === 2) {
            // 2. Connecting Lines
            for (let j = i + 1; j < particles.length; j++) {
                let distance = dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                if (distance < 120) {
                    let alpha = map(distance, 0, 120, 150, 0);
                    stroke(lineColor, alpha);
                    line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                }
            }
        }
    }
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// The Particle class remains exactly the same as the previous version
class Particle {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.vx = random(-0.5, 0.5);
        this.vy = random(-0.5, 0.5);
        this.radius = random(1, 3);
        this.rainSpeed = random(1, 4);
        this.orbitRadius = random(min(width, height) / 2.5);
        this.orbitAngle = random(TWO_PI);
        this.orbitSpeed = random(0.005, 0.02);
        this.noiseOffset = random(1000);
        this.maxSpeed = 2;
        this.friction = 0.98;
        this.maxJitterSpeed = 0.75;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    rain() {
        this.y += this.rainSpeed;
        if (this.y > height) {
            this.y = random(-10, -50);
            this.x = random(width);
        }
    }

    orbit() {
        let noiseFactor = noise(this.noiseOffset + frameCount * 0.005);
        let r = this.orbitRadius * map(noiseFactor, 0, 1, 0.8, 1.2);
        this.orbitAngle += this.orbitSpeed;
        this.x = width / 2 + r * cos(this.orbitAngle);
        this.y = height / 2 + r * sin(this.orbitAngle);
    }
    
    interact() {
        let distance = dist(mouseX, mouseY, this.x, this.y);
        if (distance < 100) {
            let force = createVector(this.x - mouseX, this.y - mouseY);
            let strength = map(distance, 0, 100, 0.5, 0);
            force.setMag(strength);
            this.vx += force.x;
            this.vy += force.y;
        }
        this.vx *= this.friction;
        this.vy *= this.friction;
        let speed = createVector(this.vx, this.vy).mag();
        if (speed > this.maxSpeed) {
            this.vx *= this.maxSpeed / speed;
            this.vy *= this.maxSpeed / speed;
        }
    }
    
    jitter() {
        this.vx += random(-0.1, 0.1);
        this.vy += random(-0.1, 0.1);
        let speed = createVector(this.vx, this.vy).mag();
        if (speed > this.maxJitterSpeed) {
            this.vx *= this.maxJitterSpeed / speed;
            this.vy *= this.maxJitterSpeed / speed;
        }
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