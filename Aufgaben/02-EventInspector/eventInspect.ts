/* Aufgabe: 02-EventInspector
Name: Arthur Aguiar Rafael
Matrikel: 271023
Datum: 20.10.2022
Quellen: -
*/
namespace eventInspect {

    window.addEventListener("load", handleLoad);

    function handleLoad() {

        // let body: HTMLBodyElement = <HTMLBodyElement>document.body;
        // let div0: HTMLDivElement = <HTMLDivElement>document.querySelector(".div0");
        // let div1: HTMLDivElement = <HTMLDivElement>document.querySelector(".div1");

        let button: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button");

        document.addEventListener("mousemove", setInfoBox);

        document.addEventListener("click", logInfo);
        document.addEventListener("keyup", logInfo);

        // body.addEventListener("click", logInfo);      //Wieso muss man das so machen?//
        // body.addEventListener("keyup", logInfo);

        // div0.addEventListener("click", logInfo);
        // div0.addEventListener("keyup", logInfo);

        // div1.addEventListener("click", logInfo);
        // div1.addEventListener("keyup", logInfo);

        button.addEventListener("click", customEvent);
        button.addEventListener("keyup", customEvent);

    }

    function setInfoBox(_event: MouseEvent) {

        let mouseX = _event.clientX;
        let mouseY = _event.clientY;

        let span = <HTMLSpanElement>document.querySelector("#spanA");

        span.innerHTML = mouseX + " " + mouseY;

        span.style.top = mouseY + 10 + "px";
        span.style.left = mouseX + 10 + "px";
        span.style.visibility = "visible";
        //console.log(mouseX, mouseY);
    }

    function logInfo(_event: Event) {

        console.log(_event.type);
        console.log(_event.target);
        console.log(_event.currentTarget);
        console.log(_event);
        console.log("-------");

        // console.log("Event Type: " + _event.type);       //Unsischer wie die Ausgabe aussehen soll, daher beide eingefügt und eins auskommentiert//
        // console.log("Event Target: " + _event.target);
        // console.log("Event Current Target: " + _event.currentTarget);
        // console.log("Event: " + _event);
        // console.log("-------");
    }

    function customEvent(_event: Event) {

        let button: HTMLButtonElement = <HTMLButtonElement>_event.target;
        let newbubble: CustomEvent = new CustomEvent("catch", { bubbles: true });

        button.dispatchEvent(newbubble);
        console.log(newbubble);
    }
}