"use strict";
/* Aufgabe: 03-Einkaufsliste
Name: Arthur Aguiar Rafael
Matrikel: 271023
Datum: 27.10.2022
Quellen: -
*/
var shoppingList;
(function (shoppingList) {
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        shoppingList.generateItem(shoppingList.data);
        let submit = document.querySelector(".submit");
        let check = document.querySelector(".check");
        // let currentdate = <HTMLDivElement>document.querySelector(".date");
        let deleteall = document.querySelector(".delete");
        // let deleted = <HTMLElement>document.querySelector(".fa-trash-can");
        // currentdate.innerHTML = grabDate();
        submit.addEventListener("click", logItems);
        check.addEventListener("click", isChecked);
        deleteall.addEventListener("click", emptyCart);
        // deleted.addEventListener("click", throwItem);
    }
    function emptyCart() {
        console.log("Emptied the whole Cart!");
    }
    function throwItem() {
        console.log("Threw Item away.");
    }
    function isChecked() {
        console.log("check: clicked");
    }
    function logItems() {
        let name = document.querySelector(".name");
        let num = document.querySelector(".num");
        let comment = document.querySelector(".comment");
        let type = document.querySelector("#category");
        // console.log("Added Item: " + num.value + " " + name.value + " " + grabDate() + " " + type.value + " " + comment.value);
        let item = document.querySelector(".item");
        let checkbox = document.querySelector("input");
        checkbox.type = "checkbox";
        let label = document.createElement(".item");
        label.innerHTML = num.value + name.value + grabDate() + type.value + comment.value;
        item.appendChild(label);
    }
})(shoppingList || (shoppingList = {}));
function grabDate() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return day + "/" + month + "/" + year;
}
//# sourceMappingURL=store.js.map