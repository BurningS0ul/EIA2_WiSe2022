"use strict";
/* Aufgabe: 03-Einkaufsliste/ 04-Data struct/ 05-Json update
Name: Arthur Aguiar Rafael
Matrikel: 271023
Datum: 27.10.2022/ 03.11.2022/ 10.11.2022
Quellen: -
*/
var shoppingList;
(function (shoppingList) {
    window.addEventListener("load", handleLoad);
    let url = "https://webuser.hs-furtwangen.de/~aguiarra/Database/";
    let query = new URLSearchParams();
    async function handleLoad(_event) {
        let response = await fetch("Data.json");
        let offer = await response.text();
        let data = JSON.parse(offer);
        console.log(data);
        shoppingList.generateItem(data);
        query.set("command", "find");
        query.set("collection", "Data");
        console.log(query.toString());
        let res = await fetch(url + "?" + query.toString());
        let resText = await res.text();
        alert(resText);
        let bt = document.querySelector(".submit");
        let deb = document.querySelector("#DEBUG");
        let del = document.querySelector(".fa-trash-can");
        bt.addEventListener("click", logItems);
        deb.addEventListener("click", DebugInfo);
        del.addEventListener("click", deleteItems);
    }
    function logItems(_event) {
        // console.log(_event.currentTarget);
        let name = document.querySelector(".name");
        let num = document.querySelector(".num");
        let comment = document.querySelector(".comment");
        let type = document.querySelector("#category");
        console.log("Added Item: " + num.value + " " + name.value + " " + grabDate() + " " + type.value + " " + comment.value);
        console.log(query.toString());
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        let im = document.querySelector(".item");
        let placehold = document.createElement("label");
        let trash = document.createElement("button");
        trash.type = ".fa-trash-can";
        im.appendChild(checkbox);
        placehold.textContent = name.value + " " + num.value + " " + grabDate() + " " + type.value + " " + comment.value;
        im.appendChild(placehold);
        im.appendChild(trash);
    }
    function grabDate() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        return day + "/" + month + "/" + year;
    }
    function deleteItems(_event) {
        console.log("deleted");
        let placehold = document.querySelector("div");
        if (_event.currentTarget == document.querySelector(".fa-trash-can")) {
            placehold.removeChild(placehold);
        }
        if (_event.currentTarget == document.querySelector(".delete")) {
            placehold.remove();
        }
    }
    async function DebugInfo() {
        query.set("command", "find");
        query.set("collection", "Data");
        console.log(query.toString());
        let res = await fetch(url + "?" + query.toString());
        let resText = await res.text();
        alert(resText);
    }
})(shoppingList || (shoppingList = {}));
//# sourceMappingURL=store.js.map