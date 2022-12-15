/* Aufgabe: 09.2 - Animated Classes
Name: Arthur Aguiar Rafael
Matrikel: 271023
Datum: 15.12.22
Quellen: -
*/
namespace Artpiece {

    export class Snowflake {
        posX: number;
        posY: number;
        speed: number;

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
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.posX, this.posY, rad, 0, 2 * Math.PI);
            ctx.fillStyle = "#FFFFFF";
            ctx.fill();
            ctx.restore();
            ctx.closePath();
        }
    }
}