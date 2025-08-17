document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('fish-simulation');
    if (!canvas) {
        console.error("Canvas element not found!");
        return;
    }
    const ctx = canvas.getContext('2d');

    // --- Simulation Constants (tuned for visualization) ---
    const FISH_COUNT = 60;
    const FISH_SPEED = 1.2;
    const MAX_TURN_RATE = 0.08; // Radians per frame
    const SHILL_INFLUENCE = 5; // How much stronger the red fish's influence is

    // Couzin model radii, scaled for the canvas
    const R_REPEL = 20;   // Zone of Repulsion
    const R_ORIENT = 50;  // Zone of Orientation
    const R_ATTRACT = 100; // Zone of Attraction

    let school = [];
    let shill = null; // Reference to the red fish
    const mouse = { x: canvas.width / 2, y: canvas.height / 2, active: false };

    // --- Vector Math Helpers ---
    class Vector {
        constructor(x, y) { this.x = x; this.y = y; }
        add(v) { return new Vector(this.x + v.x, this.y + v.y); }
        subtract(v) { return new Vector(this.x - v.x, this.y - v.y); }
        multiply(s) { return new Vector(this.x * s, this.y * s); }
        magnitude() { return Math.sqrt(this.x * this.x + this.y * this.y); }
        normalize() {
            const mag = this.magnitude();
            return mag > 0 ? new Vector(this.x / mag, this.y / mag) : new Vector(0, 0);
        }
    }

    // --- Fish Class ---
    class Fish {
        constructor(x, y, isShill = false) {
            this.pos = new Vector(x, y);
            const angle = Math.random() * 2 * Math.PI;
            this.vel = new Vector(Math.cos(angle), Math.sin(angle)).multiply(FISH_SPEED);
            this.isShill = isShill;
        }

        update(school, mouse) {
            // --- Shill (Red Fish) Logic: Only follows the mouse ---
            if (this.isShill) {
                let desiredVel = new Vector(this.vel.x, this.vel.y);
                if (mouse.active) {
                    const mouseDist = this.pos.subtract(new Vector(mouse.x, mouse.y)).magnitude();
                    if (mouseDist > 5) { // Avoid jittering when on top of the mouse
                       desiredVel = new Vector(mouse.x, mouse.y).subtract(this.pos).normalize();
                    }
                }
                 // --- This block for velocity update is the same for all fish ---
                if (desiredVel.magnitude() > 0) {
                    let targetAngle = Math.atan2(desiredVel.y, desiredVel.x);
                    let currentAngle = Math.atan2(this.vel.y, this.vel.x);
                    let angleDiff = targetAngle - currentAngle;
                    while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
                    while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
                    const turn = Math.max(-MAX_TURN_RATE, Math.min(MAX_TURN_RATE, angleDiff));
                    const newAngle = currentAngle + turn;
                    this.vel = new Vector(Math.cos(newAngle), Math.sin(newAngle));
                }
                this.pos = this.pos.add(this.vel.multiply(FISH_SPEED));
                this.handleBoundaries();
                return; // Shill logic is done
            }

            // --- Normal Fish Logic ---
            let repelVec = new Vector(0, 0);
            let orientVec = new Vector(0, 0);
            let attractVec = new Vector(0, 0);
            let repelCount = 0, orientCount = 0, attractCount = 0;

            // --- Interaction with other fish ---
            for (const other of school) {
                if (other === this) continue;
                const dist = this.pos.subtract(other.pos).magnitude();
                const weight = other.isShill ? SHILL_INFLUENCE : 1;

                if (dist > 0 && dist < R_REPEL) {
                    repelVec = repelVec.add(this.pos.subtract(other.pos).normalize().multiply(weight));
                    repelCount++;
                }
                if (dist > R_REPEL && dist < R_ORIENT) {
                    orientVec = orientVec.add(other.vel.normalize().multiply(weight));
                    orientCount++;
                }
                if (dist > R_ORIENT && dist < R_ATTRACT) {
                    attractVec = attractVec.add(other.pos.subtract(this.pos).normalize().multiply(weight));
                    attractCount++;
                }
            }
            
            // --- Determine desired direction based on Couzin model hierarchy ---
            let desiredVel = new Vector(this.vel.x, this.vel.y);
            if (repelCount > 0) {
                desiredVel = repelVec.normalize();
            } else if (orientCount > 0 || attractCount > 0) {
                desiredVel = new Vector(0,0);
                if (orientCount > 0) desiredVel = desiredVel.add(orientVec.normalize());
                if (attractCount > 0) desiredVel = desiredVel.add(attractVec.normalize());
                desiredVel = desiredVel.normalize();
            }

            // --- Update velocity ---
            if (desiredVel.magnitude() > 0) {
                // Calculate angle difference and clamp turning rate
                let targetAngle = Math.atan2(desiredVel.y, desiredVel.x);
                let currentAngle = Math.atan2(this.vel.y, this.vel.x);
                let angleDiff = targetAngle - currentAngle;

                // Handle angle wrapping
                while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
                while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

                const turn = Math.max(-MAX_TURN_RATE, Math.min(MAX_TURN_RATE, angleDiff));
                const newAngle = currentAngle + turn;
                this.vel = new Vector(Math.cos(newAngle), Math.sin(newAngle));
            }

            this.pos = this.pos.add(this.vel.multiply(FISH_SPEED));
            this.handleBoundaries();
        }

        handleBoundaries() {
            if (this.pos.x < 0) this.pos.x = canvas.width;
            if (this.pos.x > canvas.width) this.pos.x = 0;
            if (this.pos.y < 0) this.pos.y = canvas.height;
            if (this.pos.y > canvas.height) this.pos.y = 0;
        }

        draw() {
            const angle = Math.atan2(this.vel.y, this.vel.x);
            ctx.save();
            ctx.translate(this.pos.x, this.pos.y);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(10, 0);
            ctx.lineTo(-5, -5);
            ctx.lineTo(-5, 5);
            ctx.closePath();
            ctx.fillStyle = this.isShill ? "rgba(220, 50, 50, 0.9)" : "rgba(40, 100, 200, 0.8)";
            ctx.fill();
            ctx.restore();
        }
    }
    
    function drawDottedPath(shill, target) {
        // Create a "ghost" of the shill to simulate its path
        let ghost = {
            pos: new Vector(shill.pos.x, shill.pos.y),
            vel: new Vector(shill.vel.x, shill.vel.y)
        };
        
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = "rgba(220, 50, 50, 0.6)";
        ctx.lineWidth = 2;
        ctx.setLineDash([2, 5]);
        ctx.moveTo(ghost.pos.x, ghost.pos.y);

        // Simulate 200 steps into the future
        for (let i = 0; i < 200; i++) {
            const targetPos = new Vector(target.x, target.y);
            const distToTarget = ghost.pos.subtract(targetPos).magnitude();
            
            // Stop simulating if we've reached the target
            if (distToTarget < FISH_SPEED) break;

            // Use the same steering logic as the real shill
            let desiredVel = targetPos.subtract(ghost.pos).normalize();
            let targetAngle = Math.atan2(desiredVel.y, desiredVel.x);
            let currentAngle = Math.atan2(ghost.vel.y, ghost.vel.x);
            let angleDiff = targetAngle - currentAngle;
            while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
            while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
            const turn = Math.max(-MAX_TURN_RATE, Math.min(MAX_TURN_RATE, angleDiff));
            const newAngle = currentAngle + turn;

            // Update ghost's state
            ghost.vel = new Vector(Math.cos(newAngle), Math.sin(newAngle));
            ghost.pos = ghost.pos.add(ghost.vel.multiply(FISH_SPEED));
            
            // Draw the next segment of the path
            ctx.lineTo(ghost.pos.x, ghost.pos.y);
        }
        
        ctx.stroke();
        ctx.restore();
    }

    // --- Mouse Handling ---
    canvas.addEventListener('mousemove', e => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.active = true;
    });
    canvas.addEventListener('mouseleave', () => {
        mouse.active = false;
    });

    // --- Initialization and Animation Loop ---
    function init() {
        school = [];
        // Create the shill (red fish) first
        shill = new Fish(Math.random() * canvas.width, Math.random() * canvas.height, true);
        school.push(shill);
        // Create the rest of the school
        for (let i = 0; i < FISH_COUNT - 1; i++) {
            school.push(new Fish(Math.random() * canvas.width, Math.random() * canvas.height));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw dotted path from shill to mouse
        if (mouse.active && shill) {
            drawDottedPath(shill, mouse);
        }
        
        for (const fish of school) {
            fish.update(school, mouse);
            fish.draw();
        }
        requestAnimationFrame(animate);
    }

    init();
    animate();
});