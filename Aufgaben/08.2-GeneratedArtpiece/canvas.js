"use strict";
/* Aufgabe: 08.2 - Generated Artpiece
Name: Arthur Aguiar Rafael
Matrikel: 271023
Datum: 30.11.22
Quellen: EIA 2 Videos, Bastian Aberle, Lisa Bindenhöfer
*/
var Artpiece;
(function (Artpiece) {
    window.addEventListener("load", handleLoad);
    window.addEventListener("resize", handleLoad, false);
    let ctx;
    let golden = 0.6;
    let i = 0;
    let j = 0;
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        ctx = canvas.getContext("2d");
        if (!canvas) {
            return;
        }
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let horizon = ctx.canvas.height * golden;
        let posMountains = { x: 0, y: horizon };
        let posTrees = { x: 0, y: horizon };
        generateSkybox();
        drawSun({ x: 100, y: 75 });
        makeClouds({ x: 500, y: 125 }, { x: 250, y: 75 });
        randomMountain(posMountains, 75, 200, getRandomValue("#"), getRandomLight("#"));
        randomMountain(posMountains, 50, 150, "#222222", "#DDDDDD");
        randomTrees(posTrees, 0, canvas.width);
        buildSnowman({ x: canvas.width - 200, y: canvas.height - 100 });
        birdhouse({ x: canvas.width / 4, y: canvas.height - 100 });
        freeBird({ x: canvas.width, y: canvas.height - 100 });
        flyBird({ x: canvas.width, y: canvas.height + 100 });
        residentSleeper({ x: canvas.width / 4 + 23, y: canvas.height - 130 });
        perchedBird({ x: canvas.width / 4 + 20, y: canvas.height - 230 });
        letItSnow({ x: canvas.width, y: canvas.height });
    }
    function drawCircle(_r, _color) {
        ctx.arc(0, 0, _r, 0, 2 * Math.PI);
        ctx.fillStyle = _color;
        ctx.strokeStyle = "#AAAAAA";
        ctx.fill();
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
        gradient.addColorStop(1, "#FFFFFF");
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
        let stepMax = 250;
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
    function randomTrees(_position, _min, _max) {
        let x = 40;
        let x2 = 10;
        let woods = Math.round(Math.random() * (x - x2) + x2);
        for (i = 0; i < woods; i++) {
            _position.x = Math.random() * (_max - _min) + _min;
            _position.y = ctx.canvas.height * 0.58;
            let b = Math.round(Math.random() * (30 - 20) + 20);
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
    function buildSnowman(_position) {
        console.log("Snowman", _position);
        let h = 5;
        let w = 20;
        let scaling = 1.3;
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
    function getRandomNumber() {
        let min = Math.ceil(800);
        let max = Math.floor(1600);
        let result = Math.floor(Math.random() * (max - min + 1) + min);
        console.log(result);
        return result;
    }
    function letItSnow(_position) {
        let snowflakes = getRandomNumber();
        for (let flake = 0; flake < snowflakes; flake++) {
            let minrad = Math.round(Math.random() * 1);
            let maxrad = Math.round(Math.random() * 3);
            let xpos = Math.round(Math.random() * innerWidth);
            let ypos = Math.round(Math.random() * innerHeight);
            let rad = Math.floor(Math.random() * (maxrad - minrad + 1) + minrad);
            let gradient = ctx.createRadialGradient(xpos, ypos, maxrad, xpos + 40, ypos + 40, rad);
            gradient.addColorStop(0, "HSLA(200, 40%, 90%, 0.8)");
            gradient.addColorStop(1, "HSLA(200, 10%, 40%, 0)");
            ctx.save();
            ctx.beginPath();
            ctx.arc(xpos, ypos, rad, 0, 2 * Math.PI);
            ctx.fillStyle = gradient;
            ctx.fill();
            ctx.restore();
            ctx.closePath();
        }
    }
    function birdhouse(_position) {
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
    function freeBird(_position) {
        for (i = 0; i < 10; i++) {
            let col = getRandomValue("#");
            _position.x = Math.round(Math.random() * window.innerWidth);
            _position.y = ctx.canvas.height * 0.95;
            let radius = Math.round(Math.random() * (20 - 15 + 1) + 15);
            _position.y += Math.random() * 20;
            ctx.save();
            ctx.beginPath();
            ctx.ellipse(_position.x - 4, _position.y - 2, radius, radius / 1.4, 0, 0, 2 * Math.PI);
            ctx.fillStyle = col;
            ctx.filter = "brightness(40%)";
            ctx.fill();
            ctx.restore();
            ctx.closePath();
            ctx.save();
            ctx.beginPath();
            ctx.arc(_position.x, _position.y, radius, 0, 2 * Math.PI);
            ctx.fillStyle = col;
            ctx.fill();
            ctx.restore();
            ctx.closePath();
            let beak = radius + 4;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(_position.x + beak, _position.y - 8);
            ctx.lineTo(_position.x + beak + 10, _position.y - 12);
            ctx.lineTo(_position.x + beak - 2, _position.y - 20);
            ctx.lineTo(_position.x + beak, _position.y - 8);
            ctx.fillStyle = "#FFAA00";
            ctx.fill();
            ctx.restore();
            ctx.closePath();
            ctx.save();
            ctx.beginPath();
            ctx.arc(_position.x + 8, _position.y - 12, radius - 4, 0, 2 * Math.PI);
            ctx.fillStyle = col;
            ctx.fill();
            ctx.restore();
            ctx.closePath();
            ctx.save();
            ctx.beginPath();
            ctx.ellipse(_position.x - 6, _position.y + 4, radius, radius / 1.4, 0, 0, 2 * Math.PI);
            ctx.fillStyle = col;
            ctx.filter = "brightness(60%)";
            ctx.fill();
            ctx.restore();
            ctx.closePath();
            ctx.save();
            ctx.beginPath();
            ctx.translate(_position.x + 12, _position.y - 14);
            drawCircle(2, "#000000");
            ctx.restore();
            ctx.closePath();
            for (j = 0; j < 2; j++) {
                ctx.save();
                ctx.beginPath();
                ctx.translate(_position.x, _position.y + radius);
                ctx.lineTo(0, 0);
                ctx.lineTo(2, 2);
                ctx.lineTo(-4, 6);
                ctx.lineTo(0, 8);
                ctx.stroke();
                _position.x += 6;
                ctx.restore();
                ctx.closePath();
            }
        }
    }
    function flyBird(_position) {
        for (i = 0; i < 10; i++) {
            let col = getRandomValue("#");
            _position.x = Math.round(Math.random() * (window.innerWidth));
            _position.y = ctx.canvas.height * 0.35;
            let radius = Math.round(Math.random() * (20 - 15 + 1) + 15);
            ctx.save();
            _position.y = Math.random() * 60;
            ctx.beginPath();
            ctx.ellipse(_position.x + 6, _position.y - 14, radius, radius / 2.2, -10, 0, 2 * Math.PI);
            ctx.fillStyle = col;
            ctx.filter = "brightness(40%)";
            ctx.fill();
            ctx.restore();
            ctx.closePath();
            ctx.save();
            ctx.beginPath();
            ctx.arc(_position.x, _position.y, radius, 0, 2 * Math.PI);
            ctx.fillStyle = col;
            ctx.fill();
            ctx.restore();
            ctx.closePath();
            let beak = radius + 4;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(_position.x - beak, _position.y - 4);
            ctx.lineTo(_position.x - beak - 12, _position.y - 10);
            ctx.lineTo(_position.x - beak, _position.y - 20);
            ctx.fillStyle = "#FFAA00";
            ctx.fill();
            ctx.restore();
            ctx.closePath();
            ctx.save();
            ctx.beginPath();
            ctx.arc(_position.x - 16, _position.y - 8, radius - 4, 0, 2 * Math.PI);
            ctx.fillStyle = col;
            ctx.fill();
            ctx.restore();
            ctx.closePath();
            ctx.save();
            ctx.beginPath();
            ctx.ellipse(_position.x + 10, _position.y - 10, radius, radius / 2.2, -10, 0, 2 * Math.PI);
            ctx.fillStyle = col;
            ctx.filter = "brightness(60%)";
            ctx.fill();
            ctx.restore();
            ctx.closePath();
            ctx.save();
            ctx.beginPath();
            ctx.translate(_position.x - 20, _position.y - 10);
            drawCircle(2, "#000000");
            ctx.restore();
            ctx.closePath();
            for (j = 0; j < 2; j++) {
                ctx.save();
                ctx.beginPath();
                ctx.translate(_position.x, _position.y + radius);
                ctx.lineTo(0, 0);
                ctx.lineTo(8, -2);
                ctx.lineTo(2, 4);
                ctx.stroke();
                _position.x += 6;
                ctx.restore();
                ctx.closePath();
            }
        }
    }
    function residentSleeper(_position) {
        let col = getRandomValue("#");
        let radius = Math.round(Math.random() * (18 - 15 + 1) + 15);
        let beak = radius + 4;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(_position.x + beak, _position.y - 8);
        ctx.lineTo(_position.x + beak + 10, _position.y - 12);
        ctx.lineTo(_position.x + beak - 2, _position.y - 20);
        ctx.lineTo(_position.x + beak, _position.y - 8);
        ctx.fillStyle = "#FFAA00";
        ctx.fill();
        ctx.restore();
        ctx.closePath();
        ctx.save();
        ctx.beginPath();
        ctx.arc(_position.x + 8, _position.y - 12, radius - 4, 0, 2 * Math.PI);
        ctx.fillStyle = col;
        ctx.fill();
        ctx.restore();
        ctx.closePath();
        ctx.save();
        ctx.beginPath();
        ctx.translate(_position.x + 12, _position.y - 14);
        ctx.arc(0, 0, 2, 0, 1 * Math.PI);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
        ctx.closePath();
    }
    function perchedBird(_position) {
        let col = getRandomValue("#");
        let radius = Math.round(Math.random() * (20 - 15 + 1) + 15);
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(_position.x - 4, _position.y - 2, radius, radius / 1.4, 0, 0, 2 * Math.PI);
        ctx.fillStyle = col;
        ctx.filter = "brightness(40%)";
        ctx.fill();
        ctx.restore();
        ctx.closePath();
        ctx.save();
        ctx.beginPath();
        ctx.arc(_position.x, _position.y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = col;
        ctx.fill();
        ctx.restore();
        ctx.closePath();
        let beak = radius + 4;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(_position.x + beak, _position.y - 8);
        ctx.lineTo(_position.x + beak + 10, _position.y - 12);
        ctx.lineTo(_position.x + beak - 2, _position.y - 20);
        ctx.lineTo(_position.x + beak, _position.y - 8);
        ctx.fillStyle = "#FFAA00";
        ctx.fill();
        ctx.restore();
        ctx.closePath();
        ctx.save();
        ctx.beginPath();
        ctx.arc(_position.x + 8, _position.y - 12, radius - 4, 0, 2 * Math.PI);
        ctx.fillStyle = col;
        ctx.fill();
        ctx.restore();
        ctx.closePath();
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(_position.x - 6, _position.y + 4, radius, radius / 1.4, 0, 0, 2 * Math.PI);
        ctx.fillStyle = col;
        ctx.filter = "brightness(60%)";
        ctx.fill();
        ctx.restore();
        ctx.closePath();
        ctx.save();
        ctx.beginPath();
        ctx.translate(_position.x + 12, _position.y - 14);
        drawCircle(2, "#000000");
        ctx.restore();
        ctx.closePath();
        for (j = 0; j < 2; j++) {
            ctx.save();
            ctx.beginPath();
            ctx.translate(_position.x, _position.y + radius);
            ctx.lineTo(0, 0);
            ctx.lineTo(2, 2);
            ctx.lineTo(-4, 6);
            ctx.lineTo(0, 8);
            ctx.stroke();
            _position.x += 6;
            ctx.restore();
            ctx.closePath();
        }
    }
})(Artpiece || (Artpiece = {}));
//# sourceMappingURL=canvas.js.map