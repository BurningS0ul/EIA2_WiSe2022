"use strict";
/* Aufgabe: 08.2 - Generated Artpiece
Name: Arthur Aguiar Rafael
Matrikel: 271023
Datum: 30.11.22
Quellen: EIA 2 Videos, Bastian Aberle, Lisa
*/
var Landscape;
(function (Landscape) {
    window.addEventListener("load", handleLoad);
    let ctx;
    let golden = 0.62;
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        ctx = canvas.getContext("2d");
        let horizon = ctx.canvas.height * golden;
        let posMountains = { x: 0, y: horizon };
        generateSkybox();
        drawSun({ x: 100, y: 75 });
        makeClouds({ x: 500, y: 125 }, { x: 250, y: 75 });
        randomMountain(posMountains, 75, 200, getRandomValue("#"), getRandomLight("#"));
        randomMountain(posMountains, 50, 150, "#222222", "#DDDDDD");
    }
    function getRandomBlue(_color) {
        let letters = "23456789ABCDE";
        for (let i = 0; i < 2; i++) {
            _color += letters[Math.floor(Math.random() * 13)];
            console.log(_color);
        }
        return _color;
    }
    function getRandomValue(_color) {
        let letters = "0123456789ABCDEF";
        for (let i = 0; i < 6; i++) {
            _color += letters[Math.floor(Math.random() * 16)];
            console.log(_color);
        }
        return _color;
    }
    function getRandomLight(_color) {
        let letters = "CDEF";
        for (let i = 0; i < 6; i++) {
            _color += letters[Math.floor(Math.random() * 4)];
            console.log(_color);
        }
        return _color;
    }
    function generateSkybox() {
        console.log("Background");
        let gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
        gradient.addColorStop(0, getRandomBlue("#0000"));
        gradient.addColorStop(golden, getRandomLight("#"));
        gradient.addColorStop(1, getRandomBlue("#0000"));
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    function drawSun(_position) {
        console.log("Sun", _position);
        let r1 = 30;
        let r2 = 150;
        let gradient = ctx.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0, "HSLA(40, 100%, 90%, 1)");
        gradient.addColorStop(1, "HSLA(40, 100%, 40%, 0)");
        ctx.save();
        ctx.translate(_position.x, _position.y);
        ctx.fillStyle = gradient;
        ctx.arc(0, 0, r2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }
    function makeClouds(_position, _size) {
        console.log("Cloud", _position, _size);
        let nParticles = 20;
        let radiusParticle = 50;
        let particle = new Path2D();
        let gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
        ctx.save();
        ctx.translate(_position.x, _position.y);
        ctx.fillStyle = gradient;
        for (let drawn = 0; drawn < nParticles; drawn++) {
            ctx.save();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            ctx.translate(x, y);
            ctx.fill(particle);
            ctx.restore();
        }
        ctx.restore();
    }
    function randomMountain(_position, _min, _max, _colorLow, _colorHigh) {
        console.log("Mountains", _position, _min, _max);
        let stepMin = 50;
        let stepMax = 150;
        let x = 0;
        ctx.save();
        ctx.translate(_position.x, _position.y);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -_max);
        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y = -_min - Math.random() * (_max - _min);
            ctx.lineTo(x, y);
        } while (x < ctx.canvas.width);
        ctx.lineTo(x, 0);
        ctx.closePath();
        let gradient = ctx.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.7, _colorHigh);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();
    }
})(Landscape || (Landscape = {}));
//# sourceMappingURL=canvas.js.map