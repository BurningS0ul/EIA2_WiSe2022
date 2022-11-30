/* Aufgabe: 08.2 - Generated Artpiece
Name: Arthur Aguiar Rafael
Matrikel: 271023
Datum: 30.11.22
Quellen: EIA 2 Videos, Bastian Aberle, Lisa
*/

namespace Artpiece {

    interface Vector {
        x: number;
        y: number;
    }

    window.addEventListener("load", handleLoad);
    let ctx: CanvasRenderingContext2D;
    let golden: number = 0.62;

    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        ctx = <CanvasRenderingContext2D>canvas.getContext("2d");

        let horizon: number = ctx.canvas.height * golden;

        let posMountains: Vector = { x: 0, y: horizon };
        generateSkybox();
        drawSun({ x: 100, y: 75 });
        makeClouds({ x: 500, y: 125 }, { x: 250, y: 75 });
        randomMountain(posMountains, 75, 200, getRandomValue("#"), getRandomLight("#"));
        randomMountain(posMountains, 50, 150, "#222222", "#DDDDDD");
    }

    function getRandomBlue(_color: string) {
        let letters: string = "23456789ABCDE";
        for (let i: number = 0; i < 2; i++) {
            _color += letters[Math.floor(Math.random() * 13)];
            console.log(_color);
        }
        return _color;
    }

    function getRandomValue(_color: string) {
        let letters: string = "0123456789ABCDEF";
        for (let i: number = 0; i < 6; i++) {
            _color += letters[Math.floor(Math.random() * 16)];
            console.log(_color);
        }
        return _color;
    }

    function getRandomLight(_color: string) {
        let letters: string = "CDEF";
        for (let i: number = 0; i < 6; i++) {
            _color += letters[Math.floor(Math.random() * 4)];
            console.log(_color);
        }
        return _color;
    }

    function generateSkybox(): void {
        console.log("Background");

        let gradient: CanvasGradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
        gradient.addColorStop(0, getRandomBlue("#0000"));
        gradient.addColorStop(golden, getRandomLight("#"));
        gradient.addColorStop(1, getRandomBlue("#0000"));

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
        let stepMax: number = 150;
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
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.7, _colorHigh);

        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.restore();
    }
}