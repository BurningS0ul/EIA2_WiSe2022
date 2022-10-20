"use strict";
/* Aufgabe: 01-Zufallsgedicht
Name: Arthur Aguiar Rafael
Matrikel: 271023
Datum: 20.10.2022
Quellen: -
*/
window.addEventListener("load", handleLoad);
function handleLoad() {
    document.addEventListener("mousemove", setInfoBox);
    document.addEventListener("click", logInfo);
    document.addEventListener("keyup", logInfo);
}
function setInfoBox(_event) {
    let spam = document.getElementById("spanA");
    let mouseX = _event.clientX;
    let mouseY = _event.clientY;
    spam.innerHTML = mouseX + " " + mouseY;
    spam.style.top = mouseY + 10 + "px";
    spam.style.left = mouseX + 10 + "px";
    console.log(mouseX, mouseY);
}
//# sourceMappingURL=eventInspect.js.map