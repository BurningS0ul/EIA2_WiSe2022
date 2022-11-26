
namespace ArtCanvas {

    interface Vector {
        x: number;
        y: number;
    }

    window.addEventListener("load", handleCanvas);
    let ctx: CanvasRenderingContext2D;
    let rando: number = Math.round(Math.random() * 9);
    console.log(rando);
    let pattern: CanvasRenderingContext2D = <CanvasRenderingContext2D>document.createElement("canvas").getContext("2d");

    function handleCanvas() {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas) {
            return;
        }
        ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
        if (!ctx) {
            return;
        }

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        fillCanvas("#");
        drawCanvas({ x: canvas.width, y: canvas.height });

    }

    function getRandomColor(_color: string) {
        let letters: string = "0123456789ABCDEF";
        for (let i: number = 0; i < 6; i++) {
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

    function fillCanvas(_color: string) {
        ctx.fillStyle = getRandomColor(_color);
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    function drawCanvas(_position: Vector) {
        let forms: number = getRandomNumber();

        for (let draw: number = 0; draw < forms; draw++) {
            let w: number = Math.round(Math.random() * forms) + 10;
            let h: number = Math.round(Math.random() * forms) + 10;
            let x: number = Math.round(Math.random() * innerWidth);
            let y: number = Math.round(Math.random() * innerHeight);
            let y2: number = Math.round(Math.random() * innerHeight);
            let z: number = Math.round(Math.random() * 4);
            let a: number = Math.round(Math.random() * innerHeight - 300);
            let b: number = Math.round(Math.random() * innerHeight - 300);
            let r: number = Math.round((Math.random() * 100));
            let rx: number = Math.round((Math.random() * 40) + 20);
            let ry: number = Math.round((Math.random() * 40) + 20);
            let rot: number = Math.round(Math.random() * 360);
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
                    ctx.fillStyle = <CanvasPattern>ctx.createPattern(pattern.canvas, "repeat");
                    ctx.fillRect(x, y, x, y);
                    break;
            }
            ctx.closePath();
            ctx.stroke();
        }
    }
}