"use strict";
/* Aufgabe: 09.2 - Animated Classes
Name: Arthur Aguiar Rafael
Matrikel: 271023
Datum: 15.12.22
Quellen: -
*/
var Artpiece;
(function (Artpiece) {
    class Snowflake {
        pos;
        speed;
        size;
        movement;
        constructor() {
            this.pos = new Artpiece.Vector();
            this.pos.x = Math.random() * window.innerWidth;
            this.pos.y = Math.random() * window.innerHeight;
            this.speed = Math.random() * 4 + 1;
            this.size = Math.random() * 5 + 1;
            this.movement = Math.random() * 2 - 1;
        }
        update() {
            this.pos.y += this.speed;
            this.pos.x += this.movement;
            if (this.pos.y > window.innerHeight) {
                this.pos.y = 0;
            }
            if (this.pos.x < 0 || this.pos.x > window.innerWidth) {
                this.pos.x = Math.random() * window.innerWidth;
            }
        }
        draw() {
            Artpiece.ctx.save();
            Artpiece.ctx.beginPath();
            Artpiece.ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI);
            Artpiece.ctx.fillStyle = "#FFFFFF";
            Artpiece.ctx.fill();
            Artpiece.ctx.restore();
            Artpiece.ctx.closePath();
        }
    }
    Artpiece.Snowflake = Snowflake;
})(Artpiece || (Artpiece = {}));
//# sourceMappingURL=snowflakes.js.map