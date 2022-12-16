"use strict";
var Artpiece;
(function (Artpiece) {
    class Bird {
        posX;
        posY;
        size;
        speed;
        color;
        fly;
        peck;
        sleep;
        land;
        constructor() {
            this.posX = Math.random() * window.innerWidth;
            this.posY = Math.random() * window.innerHeight;
            this.speed = Math.random() * 4 + 1;
            this.size = Math.random() * 5 + 1;
        }
    }
    Artpiece.Bird = Bird;
})(Artpiece || (Artpiece = {}));
//# sourceMappingURL=birds.js.map