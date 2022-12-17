/* Aufgabe: 09.2 - Animated Classes
Name: Arthur Aguiar Rafael
Matrikel: 271023
Datum: 15.12.22
Quellen: -
*/

namespace Artpiece {

    window.addEventListener("load", handleLoad);
    window.addEventListener("resize", handleLoad, false);
    export let ctx: CanvasRenderingContext2D;
    let imgdata: ImageData;
    let golden: number = 0.6;
    let i: number = 0;
    let j: number = 0;
    export let letters: string;
    let snowflakes = [];
    let birds = [];
    export let col: string = getRandomValue("#");

    for (i = 0; i < 400; i++) {
        snowflakes.push(new Snowflake());
    }
    for (i = 0; i < 20; i++) {
        let pos: { x: number, y: number } = {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
        };
        let size: number = 15 + Math.random() * 20;
        let speed: number = 2 + Math.random() * 5;
        let birdie: Bird = new Bird(pos, size, getRandomValue("#"), speed);
        birds.push(birdie);
    }

    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        ctx = <CanvasRenderingContext2D>canvas!.getContext("2d");

        if (!canvas) {
            return;
        }

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let horizon: number = ctx.canvas.height * golden;

        let posMountains: Vector = { x: 0, y: horizon };
        let posTrees: Vector = { x: 0, y: horizon };

        generateSkybox();
        drawSun({ x: 100, y: 75 });
        makeClouds({ x: 500, y: 125 }, { x: 250, y: 75 });
        randomMountain(posMountains, 75, 200, getRandomValue("#"), getRandomLight("#"));
        randomMountain(posMountains, 50, 150, "#222222", "#FFFFFF");
        randomTrees(posTrees, 0, canvas.width);
        buildSnowman({ x: canvas.width - 200, y: canvas.height - 100 });
        birdhouse({ x: canvas.width / 4, y: canvas.height - 100 });
        imgdata = ctx.getImageData(0, 0, canvas.width, canvas.height);
        releaseBirds();
        letItSnow();
    }

    function drawCircle(_r: number, _color: string) {
        ctx.arc(0, 0, _r, 0, 2 * Math.PI);
        ctx.fillStyle = _color;
        ctx.strokeStyle = "#AAAAAA";
        ctx.fill();
    }

    function getRandomBlue(_color: string) {
        let letters: string = "23456789ABCDE";
        for (let i: number = 0; i < 2; i++) {
            _color += letters[Math.floor(Math.random() * 13)];
        }
        return _color;
    }

    export function getRandomValue(_color: string) {
        let letters: string = "0123456789ABCDEF";
        for (let i: number = 0; i < 6; i++) {
            _color += letters[Math.floor(Math.random() * 16)];
        }
        return _color;
    }

    export function darkenColor(_color: string, amount: number): string {
        let r: string = _color[1] + _color[2];
        let g: string = _color[3] + _color[4];
        let b: string = _color[5] + _color[6];

        r = Math.round(Number("0x" + r) * (1 - amount)).toString(16);
        g = Math.round(Number("0x" + g) * (1 - amount)).toString(16);
        b = Math.round(Number("0x" + b) * (1 - amount)).toString(16);

        if (r.length === 1) r = "0" + r;
        if (g.length === 1) g = "0" + g;
        if (b.length === 1) b = "0" + b;

        return "#" + r + g + b;
    }


    function getRandomLight(_color: string) {
        let letters: string = "CDEF";
        for (let i: number = 0; i < 6; i++) {
            _color += letters[Math.floor(Math.random() * 4)];
        }
        return _color;
    }

    function generateSkybox(): void {
        console.log("Background");

        let gradient: CanvasGradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
        gradient.addColorStop(0, getRandomBlue("#0000"));
        gradient.addColorStop(golden, getRandomLight("#"));
        gradient.addColorStop(1, "#FFFFFF");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    function drawSun(_position: Vector): void {
        console.log("Sun", _position);

        let r1: number = 30;
        let r2: number = 150;
        let gradient: CanvasGradient = ctx.createRadialGradient(0, 0, r1, 0, 0, r2);

        gradient.addColorStop(0, "HSLA(40, 100%, 90%, 1)");
        gradient.addColorStop(1, "HSLA(40, 100%, 40%, 0)");

        ctx.save();
        ctx.translate(_position.x, _position.y);
        ctx.fillStyle = gradient;
        ctx.arc(0, 0, r2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }

    function makeClouds(_position: Vector, _size: Vector): void {
        console.log("Cloud", _position, _size);

        let nParticles: number = 20;
        let radiusParticle: number = 50;
        let particle: Path2D = new Path2D();
        let gradient: CanvasGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);

        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");

        ctx.save();
        ctx.translate(_position.x, _position.y);
        ctx.fillStyle = gradient;

        for (let drawn: number = 0; drawn < nParticles; drawn++) {
            ctx.save();
            let x: number = (Math.random() - 0.5) * _size.x;
            let y: number = - (Math.random() * _size.y);
            ctx.translate(x, y);
            ctx.fill(particle);
            ctx.restore();
        }
        ctx.restore();
    }

    function randomMountain(_position: Vector, _min: number, _max: number, _colorLow: string, _colorHigh: string): void {
        console.log("Mountains", _position, _min, _max);
        let stepMin: number = 50;
        let stepMax: number = 250;
        let x: number = 0;

        ctx.save();
        ctx.translate(_position.x, _position.y);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -_max);

        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y: number = -_min - Math.random() * (_max - _min);
            ctx.lineTo(x, y);
        } while (x < ctx.canvas.width);

        ctx.lineTo(x, 0);
        ctx.closePath();

        let gradient: CanvasGradient = ctx.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorHigh);
        gradient.addColorStop(1, _colorLow);

        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();
    }

    function randomTrees(_position: Vector, _min: number, _max: number): void {
        let x: number = 200;
        let x2: number = 100;

        let woods: number = Math.round(Math.random() * (x - x2) + x2);
        for (i = 0; i < woods; i++) {
            _position.x = Math.random() * (_max - _min) + _min;
            _position.y = ctx.canvas.height * 0.58;


            let b: number = Math.round(Math.random() * (30 - 20) + 20);

            ctx.save();
            _position.y += Math.random() * 40;
            ctx.translate(_position.x, _position.y);
            ctx.beginPath();
            ctx.rect(0, 0, 10, b);
            ctx.fillStyle = "#231913";
            ctx.fill();
            ctx.restore();
            ctx.closePath();

            for (j = 0; j < 3; j++) {
                ctx.save();
                ctx.translate(_position.x + 5, _position.y);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(10, 0);
                ctx.lineTo(0, -10);
                ctx.lineTo(-10, 0);
                ctx.lineTo(0, 0);
                ctx.fillStyle = "#006600";
                ctx.fill();
                ctx.restore();
                ctx.closePath();

                _position.y += 5;
            }
        }
    }
    function buildSnowman(_position: Vector): void {
        console.log("Snowman", _position);

        let h: number = 5;
        let w: number = 20;
        let scaling: number = 1.3;


        ctx.save();
        ctx.beginPath();
        ctx.translate(_position.x + 50, _position.y - 80);
        ctx.moveTo(0, 0);
        ctx.lineTo(30, 60);
        ctx.lineWidth = 2;
        ctx.scale(-1, -1);
        ctx.stroke();
        ctx.restore();
        ctx.closePath();


        ctx.save();
        ctx.beginPath();
        ctx.translate(_position.x - 50, _position.y - 80);
        ctx.moveTo(0, 0);
        ctx.lineTo(-30, -60);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
        ctx.closePath();

        for (i = 0; i < 3; i++) {
            ctx.save();
            ctx.beginPath();
            ctx.translate(_position.x, _position.y);
            ctx.scale(scaling, scaling);
            drawCircle(55, "#FFFFFF");
            ctx.stroke();
            _position.y -= 80;
            scaling -= 0.3;
            ctx.restore();
            ctx.closePath();
        }

        for (i = 0; i < 2; i++) {
            ctx.save();
            ctx.beginPath();
            ctx.translate(_position.x - 10, _position.y + 80);
            drawCircle(3, "#000000");
            ctx.stroke();
            _position.x += 20;
            ctx.restore();
            ctx.closePath();

        }

        for (i = 0; i < 3; i++) {
            ctx.save();
            ctx.beginPath();
            ctx.translate(_position.x - 40, _position.y + 140);
            drawCircle(6, "#000000");
            ctx.stroke();
            _position.y += 20;
            ctx.restore();
            ctx.closePath();
        }

        for (i = 0; i < 2; i++) {
            ctx.save();
            ctx.beginPath();
            ctx.translate(_position.x - 10, _position.y);
            ctx.rotate(-40);
            ctx.rect(0, 0, w, h);
            ctx.fillStyle = "#000000";
            _position.x += 3;
            _position.y -= 7;
            h += 5;
            w -= 5;
            ctx.fill();
            ctx.restore();
            ctx.closePath();
        }

        ctx.save();
        ctx.beginPath();
        ctx.translate(_position.x - 15, _position.y + 9);
        ctx.rotate(-40);
        ctx.rect(0, 0, w + 5, h - 12);
        ctx.fillStyle = "#FF0000";
        ctx.fill();
        ctx.restore();
        ctx.closePath();

        ctx.save();
        ctx.beginPath();
        ctx.translate(_position.x - 45, _position.y + 40);
        ctx.moveTo(0, 0);
        ctx.lineTo(20, 15);
        ctx.lineTo(-5, 10);
        ctx.lineTo(0, 0);
        ctx.fillStyle = "#FFAA00";
        ctx.fill();
        ctx.restore();
        ctx.closePath();

        ctx.save();
        ctx.beginPath();
        ctx.translate(_position.x - 45, _position.y + 50);
        ctx.arc(0, 0, 10, 20, 1 * Math.PI);
        ctx.stroke();
        ctx.restore();
        ctx.closePath();
    }

    export function getRandomNumber() {
        let min: number = Math.ceil(800);
        let max: number = Math.floor(1600);
        let result: number = Math.floor(Math.random() * (max - min + 1) + min);
        return result;
    }

    function updateSnowflake(): void {
        for (let snowflake of snowflakes) {
            snowflake.update();
        }
    }

    function drawSnowflake(): void {
        for (let snowflake of snowflakes) {
            snowflake.draw();
        }
    }

    function letItSnow(): void {
        updateSnowflake();
        drawSnowflake();
        requestAnimationFrame(letItSnow);
    }

    function birdhouse(_position: Vector): void {
        //Stick
        ctx.save();
        ctx.beginPath();
        ctx.translate(_position.x, _position.y);
        ctx.rect(0, 0, 20, 100);
        ctx.fillStyle = "#632E1A";
        ctx.fill();
        ctx.restore();
        ctx.closePath();

        ctx.save();
        ctx.beginPath();
        ctx.translate(_position.x - 40, _position.y - 10);
        ctx.rect(0, 0, 50, 10);
        ctx.fillStyle = "#632E1A";
        ctx.fill();
        ctx.restore();
        ctx.closePath();

        ctx.save();
        ctx.beginPath();
        ctx.translate(_position.x + 10, _position.y - 10);
        ctx.rect(0, 0, 60, 10);
        ctx.fillStyle = "#743D2B";
        ctx.fill();
        ctx.restore();
        ctx.closePath();

        //Birdhouse
        ctx.save();
        ctx.beginPath();
        ctx.translate(_position.x - 40, _position.y - 80);
        ctx.rect(0, 0, 40, 70);
        ctx.fillStyle = "#743D2B";
        ctx.fill();
        ctx.restore();
        ctx.closePath();

        ctx.save();
        ctx.beginPath();
        ctx.translate(_position.x, _position.y - 80);
        ctx.rect(0, 0, 60, 70);
        ctx.fillStyle = "#B06C49";
        ctx.fill();
        ctx.restore();
        ctx.closePath();

        //Hole
        ctx.save();
        ctx.beginPath();
        ctx.translate(_position.x + 30, _position.y - 50);
        ctx.scale(0.8, 1.2);
        drawCircle(20, "#743D2B");
        ctx.restore();
        ctx.closePath();

        ctx.save();
        ctx.beginPath();
        ctx.translate(_position.x + 28, _position.y - 50);
        ctx.scale(0.7, 1.1);
        drawCircle(20, "#632E1A");
        ctx.restore();
        ctx.closePath();

        //Rest
        ctx.save();
        ctx.beginPath();
        ctx.translate(_position.x + 25, _position.y - 20);
        ctx.rect(0, 0, 20, 3);
        ctx.fillStyle = "#743D2B";
        ctx.fill();
        ctx.restore();
        ctx.closePath();

        ctx.save();
        ctx.beginPath();
        ctx.translate(_position.x + 45, _position.y - 20);
        ctx.scale(1, 1.4);
        drawCircle(2, "#743D2B");
        ctx.restore();
        ctx.closePath();

        ctx.save();
        ctx.beginPath();
        ctx.translate(_position.x + 46, _position.y - 20);
        ctx.scale(0.8, 1);
        drawCircle(2, "#B06C49");
        ctx.restore();
        ctx.closePath();

        //Roof
        ctx.save();
        ctx.beginPath();
        ctx.translate(_position.x - 20, _position.y - 80);
        ctx.lineTo(0, -40);
        ctx.lineTo(30, 0);
        ctx.lineTo(-30, 0);
        ctx.lineTo(0, -40);
        ctx.fillStyle = "#632E1A";
        ctx.fill();
        ctx.restore();
        ctx.closePath();

        ctx.save();
        ctx.beginPath();
        ctx.translate(_position.x + 9, _position.y - 80);
        ctx.lineTo(0, 0);
        ctx.lineTo(60, 0);
        ctx.lineTo(30, -40);
        ctx.lineTo(-30, -40);
        ctx.lineTo(0, 0);
        ctx.fillStyle = "#743D2B";
        ctx.fill();
        ctx.restore();
        ctx.closePath();
    }

    function releaseBirds() {
        ctx.putImageData(imgdata, 0, 0);
        for (let birdie of birds) {
            birdie.update();
            birdie.draw();
        }
        requestAnimationFrame(releaseBirds);
    }

    // function freeBird(_position: Vector): void {
    //     for (i = 0; i < 10; i++) {
    //         let col: string = getRandomValue("#");
    //         _position.x = Math.round(Math.random() * window.innerWidth);
    //         _position.y = ctx.canvas.height * 0.95;
    //         let radius: number = Math.round(Math.random() * (20 - 15 + 1) + 15);
    //         _position.y += Math.random() * 20;

    //         ctx.save();
    //         ctx.beginPath();
    //         ctx.ellipse(_position.x - 4, _position.y - 2, radius, radius / 1.4, 0, 0, 2 * Math.PI);
    //         ctx.fillStyle = col;
    //         ctx.filter = "brightness(40%)";
    //         ctx.fill();
    //         ctx.restore();
    //         ctx.closePath();

    //         ctx.save();
    //         ctx.beginPath();
    //         ctx.arc(_position.x, _position.y, radius, 0, 2 * Math.PI);
    //         ctx.fillStyle = col;
    //         ctx.fill();
    //         ctx.restore();
    //         ctx.closePath();

    //         let beak: number = radius + 4;
    //         ctx.save();
    //         ctx.beginPath();
    //         ctx.moveTo(_position.x + beak, _position.y - 8);
    //         ctx.lineTo(_position.x + beak + 10, _position.y - 12);
    //         ctx.lineTo(_position.x + beak - 2, _position.y - 20);
    //         ctx.lineTo(_position.x + beak, _position.y - 8);
    //         ctx.fillStyle = "#FFAA00";
    //         ctx.fill();
    //         ctx.restore();
    //         ctx.closePath();

    //         ctx.save();
    //         ctx.beginPath();
    //         ctx.arc(_position.x + 8, _position.y - 12, radius - 4, 0, 2 * Math.PI);
    //         ctx.fillStyle = col;
    //         ctx.fill();
    //         ctx.restore();
    //         ctx.closePath();

    //         ctx.save();
    //         ctx.beginPath();
    //         ctx.ellipse(_position.x - 6, _position.y + 4, radius, radius / 1.4, 0, 0, 2 * Math.PI);
    //         ctx.fillStyle = col;
    //         ctx.filter = "brightness(60%)";
    //         ctx.fill();
    //         ctx.restore();
    //         ctx.closePath();

    //         ctx.save();
    //         ctx.beginPath();
    //         ctx.translate(_position.x + 12, _position.y - 14);
    //         drawCircle(2, "#000000");
    //         ctx.restore();
    //         ctx.closePath();

    //         for (j = 0; j < 2; j++) {
    //             ctx.save();
    //             ctx.beginPath();
    //             ctx.translate(_position.x, _position.y + radius);
    //             ctx.lineTo(0, 0);
    //             ctx.lineTo(2, 2);
    //             ctx.lineTo(-4, 6);
    //             ctx.lineTo(0, 8);
    //             ctx.stroke();
    //             _position.x += 6;
    //             ctx.restore();
    //             ctx.closePath();
    //         }
    //     }
    // }

    // function flyBird(_position: Vector): void {
    //     for (i = 0; i < 10; i++) {
    //         let col: string = getRandomValue("#");
    //         _position.x = Math.round(Math.random() * (window.innerWidth));
    //         _position.y = ctx.canvas.height * 0.35;
    //         let radius: number = Math.round(Math.random() * (20 - 15 + 1) + 15);

    //         ctx.save();
    //         _position.y = Math.random() * 60;
    //         ctx.beginPath();
    //         ctx.ellipse(_position.x + 6, _position.y - 14, radius, radius / 2.2, -10, 0, 2 * Math.PI);
    //         ctx.fillStyle = col;
    //         ctx.filter = "brightness(40%)";
    //         ctx.fill();
    //         ctx.restore();
    //         ctx.closePath();

    //         ctx.save();
    //         ctx.beginPath();
    //         ctx.arc(_position.x, _position.y, radius, 0, 2 * Math.PI);
    //         ctx.fillStyle = col;
    //         ctx.fill();
    //         ctx.restore();
    //         ctx.closePath();

    //         let beak: number = radius + 4;
    //         ctx.save();
    //         ctx.beginPath();
    //         ctx.moveTo(_position.x - beak, _position.y - 4);
    //         ctx.lineTo(_position.x - beak - 12, _position.y - 10);
    //         ctx.lineTo(_position.x - beak, _position.y - 20);
    //         ctx.fillStyle = "#FFAA00";
    //         ctx.fill();
    //         ctx.restore();
    //         ctx.closePath();

    //         ctx.save();
    //         ctx.beginPath();
    //         ctx.arc(_position.x - 16, _position.y - 8, radius - 4, 0, 2 * Math.PI);
    //         ctx.fillStyle = col;
    //         ctx.fill();
    //         ctx.restore();
    //         ctx.closePath();

    //         ctx.save();
    //         ctx.beginPath();
    //         ctx.ellipse(_position.x + 10, _position.y - 10, radius, radius / 2.2, -10, 0, 2 * Math.PI);
    //         ctx.fillStyle = col;
    //         ctx.filter = "brightness(60%)";
    //         ctx.fill();
    //         ctx.restore();
    //         ctx.closePath();

    //         ctx.save();
    //         ctx.beginPath();
    //         ctx.translate(_position.x - 20, _position.y - 10);
    //         drawCircle(2, "#000000");
    //         ctx.restore();
    //         ctx.closePath();

    //         for (j = 0; j < 2; j++) {
    //             ctx.save();
    //             ctx.beginPath();
    //             ctx.translate(_position.x, _position.y + radius);
    //             ctx.lineTo(0, 0);
    //             ctx.lineTo(8, -2);
    //             ctx.lineTo(2, 4);
    //             ctx.stroke();
    //             _position.x += 6;
    //             ctx.restore();
    //             ctx.closePath();
    //         }
    //     }
    // }

    // function residentSleeper(_position: Vector): void {
    //     let col: string = getRandomValue("#");
    //     let radius: number = Math.round(Math.random() * (18 - 15 + 1) + 15);

    //     let beak: number = radius + 4;
    //     ctx.save();
    //     ctx.beginPath();
    //     ctx.moveTo(_position.x + beak, _position.y - 8);
    //     ctx.lineTo(_position.x + beak + 10, _position.y - 12);
    //     ctx.lineTo(_position.x + beak - 2, _position.y - 20);
    //     ctx.lineTo(_position.x + beak, _position.y - 8);
    //     ctx.fillStyle = "#FFAA00";
    //     ctx.fill();
    //     ctx.restore();
    //     ctx.closePath();

    //     ctx.save();
    //     ctx.beginPath();
    //     ctx.arc(_position.x + 8, _position.y - 12, radius - 4, 0, 2 * Math.PI);
    //     ctx.fillStyle = col;
    //     ctx.fill();
    //     ctx.restore();
    //     ctx.closePath();

    //     ctx.save();
    //     ctx.beginPath();
    //     ctx.translate(_position.x + 12, _position.y - 14);
    //     ctx.arc(0, 0, 2, 0, 1 * Math.PI);
    //     ctx.lineWidth = 2;
    //     ctx.stroke();
    //     ctx.restore();
    //     ctx.closePath();

    // }

    // function perchedBird(_position: Vector): void {
    //     let col: string = getRandomValue("#");
    //     let radius: number = Math.round(Math.random() * (20 - 15 + 1) + 15);

    //     ctx.save();
    //     ctx.beginPath();
    //     ctx.ellipse(_position.x - 4, _position.y - 2, radius, radius / 1.4, 0, 0, 2 * Math.PI);
    //     ctx.fillStyle = col;
    //     ctx.filter = "brightness(40%)";
    //     ctx.fill();
    //     ctx.restore();
    //     ctx.closePath();

    //     ctx.save();
    //     ctx.beginPath();
    //     ctx.arc(_position.x, _position.y, radius, 0, 2 * Math.PI);
    //     ctx.fillStyle = col;
    //     ctx.fill();
    //     ctx.restore();
    //     ctx.closePath();

    //     let beak: number = radius + 4;
    //     ctx.save();
    //     ctx.beginPath();
    //     ctx.moveTo(_position.x + beak, _position.y - 8);
    //     ctx.lineTo(_position.x + beak + 10, _position.y - 12);
    //     ctx.lineTo(_position.x + beak - 2, _position.y - 20);
    //     ctx.lineTo(_position.x + beak, _position.y - 8);
    //     ctx.fillStyle = "#FFAA00";
    //     ctx.fill();
    //     ctx.restore();
    //     ctx.closePath();

    //     ctx.save();
    //     ctx.beginPath();
    //     ctx.arc(_position.x + 8, _position.y - 12, radius - 4, 0, 2 * Math.PI);
    //     ctx.fillStyle = col;
    //     ctx.fill();
    //     ctx.restore();
    //     ctx.closePath();

    //     ctx.save();
    //     ctx.beginPath();
    //     ctx.ellipse(_position.x - 6, _position.y + 4, radius, radius / 1.4, 0, 0, 2 * Math.PI);
    //     ctx.fillStyle = col;
    //     ctx.filter = "brightness(60%)";
    //     ctx.fill();
    //     ctx.restore();
    //     ctx.closePath();

    //     ctx.save();
    //     ctx.beginPath();
    //     ctx.translate(_position.x + 12, _position.y - 14);
    //     drawCircle(2, "#000000");
    //     ctx.restore();
    //     ctx.closePath();

    //     for (j = 0; j < 2; j++) {
    //         ctx.save();
    //         ctx.beginPath();
    //         ctx.translate(_position.x, _position.y + radius);
    //         ctx.lineTo(0, 0);
    //         ctx.lineTo(2, 2);
    //         ctx.lineTo(-4, 6);
    //         ctx.lineTo(0, 8);
    //         ctx.stroke();
    //         _position.x += 6;
    //         ctx.restore();
    //         ctx.closePath();
    //     }
    // }
}
