"use strict";
/* Aufgabe: 03-Einkaufsliste/ 04-Data struct/ 05-Json update / 06-Server Build / 06.5-Server REMAKE
Name: Arthur Aguiar Rafael
Matrikel: 271023
Datum: 27.10.2022/ 03.11.2022 / 10.11.2022 / 19.11.2022 / 23.11.2022
Quellen: - / - / - / Bastian Aberle / Bastian Aberle
*/
var shoppinglist;
(function (shoppinglist) {
    window.addEventListener("load", handleLoad);
    let url = "https://webuser.hs-furtwangen.de/~aguiarra/Database/?";
    let query = new URLSearchParams();
    async function handleResponse() {
        let response = await fetch(url + query.toString());
        let entry = await response.text();
        let data = JSON.parse(entry);
        loadData(data);
    }
    async function handleLoad() {
        let button = document.querySelector(".submit");
        button.addEventListener("click", sendData);
    }
    async function sendData() {
        let formData = new FormData(document.forms[0]);
        let json = {};
        //Umwandlung FormData in Json FormData
        for (let key of formData.keys())
            if (!json[key]) {
                let values = formData.getAll(key);
                json[key] = values.length > 1 ? values : values[0];
            }
        let newJSON = JSON.stringify(json);
        query.set("command", "insert");
        query.set("collection", "data");
        query.set("data", newJSON);
        handleResponse();
        console.log("data sent");
        loadInput();
    }
    function loadData(newData) {
        let list = [];
        for (let num in newData.data) {
            list.push(num);
        }
        for (let index of list) {
            let item = newData.data[index].Item;
            let amount = newData.data[index].Amount;
            let category = newData.data[index].Category;
            let date = newData.data[index].NewDate.toString();
            let comment = newData.data[index].Area;
            let purchaseCheckbox = newData.data[index].Checkbox;
            let purchase;
            if (purchaseCheckbox == "on") {
                purchase = " buy";
            }
            else {
                purchase = "";
            }
            loadItem(item, amount, category, comment, purchase, date, index);
        }
    }
    function loadInput() {
        let formData = new FormData(document.forms[0]);
        let amount = formData.get("input#quantity").toString();
        let item = formData.get(".name").toString();
        let date = formData.get(".date").toString();
        let category = formData.get("#category").toString();
        let comment = formData.get(".comment").toString();
        let index;
        let purchaseCheckbox = formData.get("Checkbox");
        let purchase = "";
        if (purchaseCheckbox == null) {
            purchase = "";
        }
        else {
            purchase = " buy";
        }
        loadItem(item, amount, category, comment, purchase, date, index);
        window.open("./list.html", "_self");
    }
    function loadItem(amount, item, category, comment, purchase, date, index) {
        let newDiv = document.createElement("div");
        newDiv.id = "createDiv";
        let parent = document.querySelector(".item");
        newDiv.className = "genoutput";
        newDiv.innerHTML = date + " " + amount + " " + item + " " + comment + " " + purchase;
        parent.appendChild(newDiv);
        let newContainer = document.createElement("div");
        newContainer.id = "containerIcons";
        newDiv.appendChild(newContainer);
        let newCheckbox = document.createElement("input");
        newCheckbox.type = "checkbox";
        newCheckbox.name = "Checkbox";
        newContainer.appendChild(newCheckbox);
        let newEdit = document.createElement("i");
        newEdit.classList.add("fa-solid");
        newEdit.classList.add("fa-pen-to-square");
        newContainer.appendChild(newEdit);
        let newTrash = document.createElement("i");
        newTrash.classList.add("fa-solid");
        newTrash.classList.add("fa-trash-can");
        newContainer.appendChild(newTrash);
        newEdit.addEventListener("click", function () {
            editItem(newDiv, item, amount, comment, date, index);
        });
        newTrash.addEventListener("click", function () {
            deleteItem(newDiv, index);
        });
        newCheckbox.addEventListener("click", function () {
            getDate(newDiv, index, item, amount, category, comment, date, purchase);
        });
    }
    async function getDate(newDiv, index, item, amount, category, comment, date, purchase) {
        console.log("checkbox");
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1;
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        var NewDate = year + "-" + month + "-" + day;
        newDiv.innerHTML = NewDate + " " + amount + " " + item + " " + comment + " " + purchase;
        let newContainer = document.createElement("div");
        newContainer.id = "containerIcons";
        newDiv.appendChild(newContainer);
        let newCheckbox = document.createElement("input");
        newCheckbox.type = "checkbox";
        newCheckbox.checked = true;
        newContainer.appendChild(newCheckbox);
        let newEdit = document.createElement("i");
        newEdit.classList.add("fa-solid");
        newEdit.classList.add("fa-pen-to-square");
        newContainer.appendChild(newEdit);
        let newTrash = document.createElement("i");
        newTrash.classList.add("fa-solid");
        newTrash.classList.add("fa-trash-can");
        newContainer.appendChild(newTrash);
        newEdit.addEventListener("click", function () {
            editItem(newDiv, item, amount, comment, date, index);
        });
        newTrash.addEventListener("click", function () {
            deleteItem(newDiv, index);
        });
        newCheckbox.addEventListener("click", function () {
            getDate(newDiv, index, item, amount, category, comment, date, purchase);
        });
        let json = { NewDate };
        let newJSON = JSON.stringify(json);
        let query = new URLSearchParams();
        query.set("command", "update");
        query.set("collection", "data");
        query.set("id", index);
        query.set("data", newJSON);
        handleResponse();
        console.log("data sent");
    }
    async function deleteItem(newDiv, index) {
        newDiv.parentElement.removeChild(newDiv);
        let query = new URLSearchParams();
        query.set("command", "delete");
        query.set("collection", "data");
        query.set("id", index.toString());
        handleResponse();
        console.log("deleted");
    }
    async function editItem(newDiv, item, amount, comment, date, index) {
        let itemx = document.querySelector("input.name");
        itemx.value = item;
        let amountx = document.querySelector("input.num");
        amountx.value = amount.toString();
        let commentx = document.querySelector("input.comment");
        commentx.value = comment;
        let datex = document.querySelector("input.date");
        datex.value = date;
        deleteItem(newDiv, index);
    }
})(shoppinglist || (shoppinglist = {}));
//# sourceMappingURL=store.js.map