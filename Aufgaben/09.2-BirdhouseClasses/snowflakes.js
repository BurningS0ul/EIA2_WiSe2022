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
        constructor() {
            this.posX = Math.random() * window.innerWidth;
            this.posY = Math.random() * window.innerHeight;
            this.speed = Math.random() * 5 + 1;
        }
        update() {
            this.posY += this.speed;
            if (this.posY > window.innerHeight) {
                this.posY = 0;
            }
        }
        draw() {
            Artpiece.ctx.save();
            Artpiece.ctx.beginPath();
            Artpiece.ctx.arc(this.posX, this.posY, Artpiece.rad, 0, 2 * Math.PI);
            Artpiece.ctx.fillStyle = "#FFFFFF";
            Artpiece.ctx.fill();
            Artpiece.ctx.restore();
            Artpiece.ctx.closePath();
        }
    }
    Artpiece.Snowflake = Snowflake;
})(Artpiece || (Artpiece = {}));
//# sourceMappingURL=snowflakes.js.map