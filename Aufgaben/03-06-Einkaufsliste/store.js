"use strict";
/* Aufgabe: 03-Einkaufsliste/ 04-Data struct/ 05-Json update / 06-Server Build
Name: Arthur Aguiar Rafael
Matrikel: 271023
Datum: 27.10.2022/ 03.11.2022 / 10.11.2022 / 19.11.2022
Quellen: - / - / - / Bastian Aberle
*/
var shoppingList;
(function (shoppingList) {
    window.addEventListener("load", handleLoad);
    let url = "https://webuser.hs-furtwangen.de/~aguiarra/Database/";
    let query = new URLSearchParams();
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    let trash = document.createElement("i");
    trash.classList.add("fa-solid");
    trash.classList.add("fa-trash-can");
    let placehold = document.querySelector("Label");
    async function handleLoad(_event) {
        let response = await fetch("data.json");
        let entry = await response.text();
        let data = JSON.parse(entry);
        console.log(data);
        shoppingList.generateItem(data);
        query.set("command", "show");
        query.set("collection", "data");
        console.log(query.toString());
        let res = await fetch(url + "?" + query.toString());
        let resText = await res.text();
        console.log(resText);
        query.set("command", "create");
        query.set("collection", "data");
        console.log(query.toString());
        console.log(resText);
        // if () {
        //     query.set("command", "create");
        //     query.set("collection", "Data");
        //     console.log(query.toString());
        //     console.log(resText);
        // }
        let bt = document.querySelector(".submit");
        let deb = document.querySelector("#DEBUG");
        let del = document.querySelector(".fa-solid.fa-trash-can");
        let delall = document.querySelector(".delete");
        bt.addEventListener("click", logItems);
        deb.addEventListener("click", DebugInfo);
        del.addEventListener("click", deleteItems);
        delall.addEventListener("click", deleteItems);
    }
    async function logItems(_event) {
        // console.log(_event.currentTarget);
        let name = document.querySelector(".name");
        let num = document.querySelector(".num");
        let comment = document.querySelector(".comment");
        let type = document.querySelector("#category");
        console.log("Added Item: " + num.value + " " + name.value + " " + grabDate() + " " + type.value + " " + comment.value);
        let im = document.querySelector(".item");
        let placehold = document.createElement("label");
        im.appendChild(checkbox);
        placehold.textContent = name.value + " " + num.value + " " + grabDate() + " " + type.value + " " + comment.value;
        im.appendChild(placehold);
        im.appendChild(trash);
        let formData = new FormData(document.forms[0]);
        let json = {};
        for (let key of formData.keys())
            if (!json[key]) {
                let values = formData.getAll(key);
                json[key] = values.length > 1 ? values : values[0];
            }
        let newJSON = JSON.stringify(json);
        console.log(newJSON);
        query.set("command", "insert");
        query.set("collection", "data");
        query.set("data", newJSON);
        // console.log(JSON.stringify(json));  
        let res = await fetch(url + "?" + query.toString());
        let resText = await res.text();
        alert(resText);
        console.log("data sent");
        clearInputs();
    }
    function grabDate() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        return day + "/" + month + "/" + year;
    }
    async function deleteItems(_event) {
        console.log("deleted");
        if (_event.currentTarget == document.querySelector(".fa-solid.fa-trash-can")) {
            placehold.removeChild(placehold);
            query.set("command", "delete");
            query.set("collection", "data");
            query.set("id", query.toString());
            let res = await fetch(url + "?" + query.toString());
            let resText = await res.text();
            alert(resText);
        }
        if (_event.currentTarget == document.querySelector(".delete")) {
            query.set("command", "delete");
            query.set("collection", "data");
            let res = await fetch(url + "?" + query.toString());
            let resText = await res.text();
            alert(resText);
            checkbox.remove();
            placehold.remove();
        }
    }
    async function DebugInfo() {
        query.set("command", "show");
        console.log(query.toString());
        let res = await fetch(url + "?" + query.toString());
        let resText = await res.text();
        alert(resText);
    }
    function clearInputs() {
        let name = document.querySelector(".name");
        let num = document.querySelector(".num");
        let comment = document.querySelector(".comment");
        let type = document.querySelector("#category");
        num.value = "";
        name.value = "";
        type.value = "Choose Category";
        comment.value = "";
    }
})(shoppingList || (shoppingList = {}));
//# sourceMappingURL=store.js.map