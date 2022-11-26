"use strict";
var ArtCanvas;
(function (ArtCanvas) {
    window.addEventListener("load", handleCanvas);
    let ctx;
    let rando = Math.round(Math.random() * 9);
    console.log(rando);
    let pattern = document.createElement("canvas").getContext("2d");
    function handleCanvas() {
        let canvas = document.querySelector("canvas");
        if (!canvas) {
            return;
        }
        ctx = canvas.getContext("2d");
        if (!ctx) {
            return;
        }
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        fillCanvas("#");
        drawCanvas({ x: canvas.width, y: canvas.height });
    }
    function getRandomColor(_color) {
        let letters = "0123456789ABCDEF";
        for (let i = 0; i < 6; i++) {
            _color += letters[Math.floor(Math.random() * 16)];
        }
        return _color;
    }
    function getRandomNumber() {
        let min = Math.ceil(20);
        let max = Math.floor(60);
        let result = Math.floor(Math.random() * (max - min + 1) + min);
        console.log(result);
        return result;
    }
    function fillCanvas(_color) {
        ctx.fillStyle = getRandomColor(_color);
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    function drawCanvas(_position) {
        let forms = getRandomNumber();
        for (let draw = 0; draw < forms; draw++) {
            let w = Math.round(Math.random() * forms) + 10;
            let h = Math.round(Math.random() * forms) + 10;
            let x = Math.round(Math.random() * innerWidth);
            let y = Math.round(Math.random() * innerHeight);
            let y2 = Math.round(Math.random() * innerHeight);
            let z = Math.round(Math.random() * 4);
            let a = Math.round(Math.random() * innerHeight - 300);
            let b = Math.round(Math.random() * innerHeight - 300);
            let r = Math.round((Math.random() * 100));
            let rx = Math.round((Math.random() * 40) + 20);
            let ry = Math.round((Math.random() * 40) + 20);
            let rot = Math.round(Math.random() * 360);
            ctx.beginPath();
            switch (rando) {
                case 0:
                    ctx.arc(x, y, r, 0, 2 * Math.PI);
                    ctx.fillStyle = getRandomColor("#");
                    ctx.fill();
                    break;
                case 1:
                    ctx.strokeStyle = getRandomColor("#");
                    ctx.arc(x, y, r, 0, 2 * Math.PI);
                    break;
                case 2:
                    ctx.ellipse(x, y, rx, ry, rot, 0, z);
                    ctx.fillStyle = getRandomColor("#");
                    ctx.fill();
                    break;
                case 3:
                    ctx.strokeStyle = getRandomColor("#");
                    ctx.ellipse(x, y, rx, ry, rot, 0, z);
                    break;
                case 4:
                    ctx.moveTo(x, y);
                    ctx.lineTo(a, b);
                    ctx.lineTo(b, y);
                    ctx.fillStyle = getRandomColor("#");
                    ctx.globalAlpha = Math.random();
                    ctx.fill();
                    break;
                case 5:
                    ctx.strokeStyle = getRandomColor("#");
                    ctx.moveTo(x, y);
                    ctx.lineTo(a, b);
                    ctx.lineTo(b, y);
                    break;
                case 6:
                    ctx.rect(x, y, w, h);
                    ctx.fillStyle = getRandomColor("#");
                    ctx.fill();
                    break;
                case 7:
                    ctx.strokeStyle = getRandomColor("#");
                    ctx.rect(x, y, w, h);
                    break;
                case 8:
                    ctx.strokeStyle = getRandomColor("#");
                    ctx.moveTo(x, y);
                    ctx.lineTo(y, y2);
                    break;
                case 9:
                    pattern.canvas.width = x;
                    pattern.canvas.height = y;
                    pattern.fillStyle = getRandomColor("#");
                    pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);
                    pattern.moveTo(x, y);
                    pattern.lineTo(y, y);
                    pattern.lineTo(a, x);
                    pattern.lineTo(b, x);
                    pattern.lineTo(a, y);
                    pattern.lineTo(b, y);
                    pattern.lineTo(y, x);
                    ctx.fillStyle = ctx.createPattern(pattern.canvas, "repeat");
                    ctx.fillRect(x, y, x, y);
                    break;
            }
            ctx.closePath();
            ctx.stroke();
        }
    }
})(ArtCanvas || (ArtCanvas = {}));
//# sourceMappingURL=canvas.js.map