"use strict";
/* Aufgabe: 03-Einkaufsliste
Name: Arthur Aguiar Rafael
Matrikel: 271023
Datum: 27.10.2022
Quellen: -
*/
var shoppingList;
(function (shoppingList) {
    window.addEventListener("load", loadListener);
    function loadListener() {
        let check = document.querySelector(".check");
        let item = document.querySelector(".item");
        let store = document.querySelector(".store");
        check.addEventListener("click", logItems);
        item.addEventListener("click", logItems);
        store.addEventListener("click", logItems);
    }
    function logItems() {
        console.log();
    }
})(shoppingList || (shoppingList = {}));
//# sourceMappingURL=store.js.map