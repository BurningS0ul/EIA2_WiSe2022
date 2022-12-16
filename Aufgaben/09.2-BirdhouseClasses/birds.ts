namespace Artpiece {
    export class Bird {
        posX: number;
        posY: number;
        size: number;
        speed: number;
        color: string;
        fly: boolean;
        peck: boolean;
        sleep: boolean;
        land: boolean;

        constructor() {
            this.posX = Math.random() * window.innerWidth;
            this.posY = Math.random() * window.innerHeight;
            this.speed = Math.random() * 4 + 1;
            this.size = Math.random() * 5 + 1;
        }
    }
}