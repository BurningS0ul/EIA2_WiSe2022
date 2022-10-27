/* Aufgabe: 03-Einkaufsliste
Name: Arthur Aguiar Rafael
Matrikel: 271023
Datum: 27.10.2022
Quellen: -
*/

namespace shoppingList {

    window.addEventListener("load", loadListener)

    function loadListener() {
        let check = <HTMLInputElement>document.querySelector(".check");
        let item = <HTMLDivElement>document.querySelector(".item");
        let store = <HTMLDivElement>document.querySelector(".store");

        check.addEventListener("click", logItems);
        item.addEventListener("click", logItems);
        store.addEventListener("click", logItems);
    }

    function logItems() {
        console.log();
    }
}