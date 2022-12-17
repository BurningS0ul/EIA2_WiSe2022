/* Aufgabe: 09.2 - Animated Classes
Name: Arthur Aguiar Rafael
Matrikel: 271023
Datum: 15.12.22
Quellen: -
*/
namespace Artpiece {

    export class Snowflake {
        pos: Vector;
        speed: number;
        size: number;
        movement: number;

        constructor() {
            this.pos = new Vector();
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
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI);
            ctx.fillStyle = "#FFFFFF";
            ctx.fill();
            ctx.restore();
            ctx.closePath();
        }
    }
}