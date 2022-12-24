"use strict";
var Artpiece;
(function (Artpiece) {
    class Bird {
        pos;
        size;
        speed;
        color;
        direction;
        landed;
        landTimer = 0;
        constructor(pos, size, color, speed) {
            this.pos = pos;
            this.size = size;
            this.color = color;
            this.speed = speed;
            this.direction = Math.random() * 2 * Math.PI;
        }
        update() {
            if (this.pos.y <= window.innerHeight * 7 / 8) {
                this.draw();
            }
            this.pos.x += this.speed * Math.cos(this.direction);
            this.pos.y += this.speed * Math.sin(this.direction);
            this.direction += (Math.random() - 0.5) * 0.1;
            if (this.pos.x < 0) {
                this.pos.x += window.innerWidth;
            }
            else if (this.pos.x > window.innerWidth) {
                this.pos.x -= window.innerWidth;
            }
            if (this.pos.y < 0) {
                this.pos.y += window.innerHeight;
            }
            else if (this.pos.y > window.innerHeight) {
                this.pos.y -= window.innerHeight;
            }
            if (this.pos.y >= window.innerHeight * 7 / 8) {
                this.land();
            }
            if (this.direction >= Math.PI) {
                this.mirror();
            }
        }
        land() {
            this.landed = true;
            this.landTimer = 5 + Math.random() * 15;
            this.landTimer++;
            this.speed = 0;
            if (Math.random() < 0.1) {
                this.peck();
            }
            else {
                this.drawLanded();
            }
            if (this.landTimer >= 20) {
                this.landed = false;
                this.update();
                this.speed = 2 + Math.random() * 5;
            }
        }
        drawLanded() {
            Artpiece.ctx.save();
            Artpiece.ctx.beginPath();
            Artpiece.ctx.ellipse(this.pos.x - 4, this.pos.y - 2, this.size, this.size / 1.4, 0, 0, 2 * Math.PI);
            Artpiece.ctx.fillStyle = Artpiece.darkenColor(this.color, 0.5);
            Artpiece.ctx.fill();
            Artpiece.ctx.restore();
            Artpiece.ctx.closePath();
            Artpiece.ctx.save();
            Artpiece.ctx.beginPath();
            Artpiece.ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI);
            Artpiece.ctx.fillStyle = this.color;
            Artpiece.ctx.fill();
            Artpiece.ctx.restore();
            Artpiece.ctx.closePath();
            let beak = this.size + 4;
            Artpiece.ctx.save();
            Artpiece.ctx.beginPath();
            Artpiece.ctx.lineTo(this.pos.x + beak + 10, this.pos.y - 12);
            Artpiece.ctx.lineTo(this.pos.x + beak - 2, this.pos.y - 20);
            Artpiece.ctx.lineTo(this.pos.x + beak, this.pos.y - 8);
            Artpiece.ctx.fillStyle = "#FFAA00";
            Artpiece.ctx.fill();
            Artpiece.ctx.restore();
            Artpiece.ctx.closePath();
            Artpiece.ctx.save();
            Artpiece.ctx.beginPath();
            Artpiece.ctx.arc(this.pos.x + 8, this.pos.y - 12, this.size - 4, 0, 2 * Math.PI);
            Artpiece.ctx.fillStyle = this.color;
            Artpiece.ctx.fill();
            Artpiece.ctx.restore();
            Artpiece.ctx.closePath();
            Artpiece.ctx.save();
            Artpiece.ctx.beginPath();
            Artpiece.ctx.ellipse(this.pos.x - 6, this.pos.y + 4, this.size, this.size / 1.4, 0, 0, 2 * Math.PI);
            Artpiece.ctx.fillStyle = Artpiece.darkenColor(this.color, 0.5);
            Artpiece.ctx.fill();
            Artpiece.ctx.restore();
            Artpiece.ctx.closePath();
            Artpiece.ctx.save();
            Artpiece.ctx.beginPath();
            Artpiece.ctx.translate(+15, -this.size / 1.5);
            Artpiece.ctx.arc(this.pos.x, this.pos.y, 2, 0, 2 * Math.PI);
            Artpiece.ctx.fillStyle = "#000000";
            Artpiece.ctx.fill();
            Artpiece.ctx.restore();
            Artpiece.ctx.closePath();
            Artpiece.ctx.save();
            Artpiece.ctx.beginPath();
            Artpiece.ctx.translate(this.pos.x, this.pos.y + this.size);
            Artpiece.ctx.lineTo(0, 0);
            Artpiece.ctx.lineTo(2, 2);
            Artpiece.ctx.lineTo(-4, 6);
            Artpiece.ctx.lineTo(0, 8);
            Artpiece.ctx.stroke();
            Artpiece.ctx.restore();
            Artpiece.ctx.closePath();
        }
        peck() {
            Artpiece.ctx.save();
            Artpiece.ctx.beginPath();
            Artpiece.ctx.ellipse(this.pos.x - 4, this.pos.y - 2, this.size, this.size / 1.4, 0, 0, 2 * Math.PI);
            Artpiece.ctx.fillStyle = Artpiece.darkenColor(this.color, 0.5);
            Artpiece.ctx.fill();
            Artpiece.ctx.restore();
            Artpiece.ctx.closePath();
            Artpiece.ctx.save();
            Artpiece.ctx.beginPath();
            Artpiece.ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI);
            Artpiece.ctx.fillStyle = this.color;
            Artpiece.ctx.fill();
            Artpiece.ctx.restore();
            Artpiece.ctx.closePath();
            let beak = this.size + 4;
            Artpiece.ctx.save();
            Artpiece.ctx.beginPath();
            Artpiece.ctx.lineTo(this.pos.x + beak, this.pos.y + 20);
            Artpiece.ctx.lineTo(this.pos.x + beak + 10, this.pos.y + 28);
            Artpiece.ctx.lineTo(this.pos.x + beak + 2, this.pos.y + 16);
            Artpiece.ctx.fillStyle = "#FFAA00";
            Artpiece.ctx.fill();
            Artpiece.ctx.restore();
            Artpiece.ctx.closePath();
            Artpiece.ctx.save();
            Artpiece.ctx.beginPath();
            Artpiece.ctx.arc(this.pos.x + 14, this.pos.y + 6, this.size - 4, 0, 2 * Math.PI);
            Artpiece.ctx.fillStyle = this.color;
            Artpiece.ctx.fill();
            Artpiece.ctx.restore();
            Artpiece.ctx.closePath();
            Artpiece.ctx.save();
            Artpiece.ctx.beginPath();
            Artpiece.ctx.ellipse(this.pos.x - 6, this.pos.y + 4, this.size, this.size / 1.4, 0, 0, 2 * Math.PI);
            Artpiece.ctx.fillStyle = Artpiece.darkenColor(this.color, 0.5);
            Artpiece.ctx.fill();
            Artpiece.ctx.restore();
            Artpiece.ctx.closePath();
            Artpiece.ctx.save();
            Artpiece.ctx.beginPath();
            Artpiece.ctx.translate(+20, +this.size / 1.6);
            Artpiece.ctx.arc(this.pos.x, this.pos.y, 2, 0, 2 * Math.PI);
            Artpiece.ctx.fillStyle = "#000000";
            Artpiece.ctx.fill();
            Artpiece.ctx.restore();
            Artpiece.ctx.closePath();
            Artpiece.ctx.save();
            Artpiece.ctx.beginPath();
            Artpiece.ctx.translate(this.pos.x, this.pos.y + this.size);
            Artpiece.ctx.lineTo(0, 0);
            Artpiece.ctx.lineTo(2, 2);
            Artpiece.ctx.lineTo(-4, 6);
            Artpiece.ctx.lineTo(0, 8);
            Artpiece.ctx.stroke();
            Artpiece.ctx.restore();
            Artpiece.ctx.closePath();
        }
        draw() {
            Artpiece.ctx.save();
            Artpiece.ctx.beginPath();
            Artpiece.ctx.ellipse(this.pos.x + 6, this.pos.y - 14, this.size, this.size / 2.2, -10, 0, 2 * Math.PI);
            Artpiece.ctx.fillStyle = Artpiece.darkenColor(this.color, 0.5);
            Artpiece.ctx.fill();
            Artpiece.ctx.restore();
            Artpiece.ctx.closePath();
            Artpiece.ctx.save();
            Artpiece.ctx.beginPath();
            Artpiece.ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI);
            Artpiece.ctx.fillStyle = this.color;
            Artpiece.ctx.fill();
            Artpiece.ctx.restore();
            Artpiece.ctx.closePath();
            let beak = this.size + 4;
            Artpiece.ctx.save();
            Artpiece.ctx.beginPath();
            Artpiece.ctx.moveTo(this.pos.x - this.size, this.pos.y - 4);
            Artpiece.ctx.lineTo(this.pos.x - beak - 15, this.pos.y - 10);
            Artpiece.ctx.lineTo(this.pos.x - this.size, this.pos.y - 20);
            Artpiece.ctx.fillStyle = "#FFAA00";
            Artpiece.ctx.fill();
            Artpiece.ctx.restore();
            Artpiece.ctx.closePath();
            Artpiece.ctx.save();
            Artpiece.ctx.beginPath();
            Artpiece.ctx.arc(this.pos.x - 16, this.pos.y - 8, this.size - 4, 0, 2 * Math.PI);
            Artpiece.ctx.fillStyle = this.color;
            Artpiece.ctx.fill();
            Artpiece.ctx.restore();
            Artpiece.ctx.closePath();
            Artpiece.ctx.save();
            Artpiece.ctx.beginPath();
            Artpiece.ctx.ellipse(this.pos.x + 10, this.pos.y - 10, this.size, this.size / 2.2, -10, 0, 2 * Math.PI);
            Artpiece.ctx.fillStyle = Artpiece.darkenColor(this.color, 0.5);
            Artpiece.ctx.fill();
            Artpiece.ctx.restore();
            Artpiece.ctx.closePath();
            Artpiece.ctx.save();
            Artpiece.ctx.beginPath();
            Artpiece.ctx.translate(-25, -this.size / 1.5);
            Artpiece.ctx.arc(this.pos.x, this.pos.y, 2, 0, 2 * Math.PI);
            Artpiece.ctx.fillStyle = "#000000";
            Artpiece.ctx.fill();
            Artpiece.ctx.restore();
            Artpiece.ctx.closePath();
            Artpiece.ctx.save();
            Artpiece.ctx.beginPath();
            Artpiece.ctx.translate(this.pos.x, this.pos.y + this.size);
            Artpiece.ctx.lineTo(0, 0);
            Artpiece.ctx.lineTo(8, -2);
            Artpiece.ctx.lineTo(2, 4);
            Artpiece.ctx.stroke();
            Artpiece.ctx.restore();
            Artpiece.ctx.closePath();
        }
        mirror() {
            Artpiece.ctx.save();
            Artpiece.ctx.scale(-1, 1); // Flip the canvas horizontally
            this.draw(); // Call the original draw function
            Artpiece.ctx.restore();
        }
    }
    Artpiece.Bird = Bird;
})(Artpiece || (Artpiece = {}));
//# sourceMappingURL=birds.js.map