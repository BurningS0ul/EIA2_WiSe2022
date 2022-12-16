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
        posX;
        posY;
        speed;
        size;
        movement;
        constructor() {
            this.posX = Math.random() * window.innerWidth;
            this.posY = Math.random() * window.innerHeight;
            this.speed = Math.random() * 4 + 1;
            this.size = Math.random() * 5 + 1;
            this.movement = Math.random() * 2 - 1;
        }
        update() {
            this.posY += this.speed;
            this.posX += this.movement;
            if (this.posY > window.innerHeight) {
                this.posY = 0;
            }
            if (this.posX < 0 || this.posX > window.innerWidth) {
                this.posX = Math.random() * window.innerWidth;
            }
        }
        draw() {
            Artpiece.ctx.save();
            Artpiece.ctx.beginPath();
            Artpiece.ctx.arc(this.posX, this.posY, this.size, 0, 2 * Math.PI);
            Artpiece.ctx.fillStyle = "#FFFFFF";
            Artpiece.ctx.fill();
            Artpiece.ctx.restore();
            Artpiece.ctx.closePath();
        }
    }
    Artpiece.Snowflake = Snowflake;
})(Artpiece || (Artpiece = {}));
//# sourceMappingURL=snowflakes.js.map