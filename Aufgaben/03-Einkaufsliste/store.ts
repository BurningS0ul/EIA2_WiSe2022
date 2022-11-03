/* Aufgabe: 03-Einkaufsliste
Name: Arthur Aguiar Rafael
Matrikel: 271023
Datum: 27.10.2022
Quellen: -
*/

namespace shoppingList {

    window.addEventListener("load", handleLoad);

    function handleLoad() {

        let submit = <HTMLButtonElement>document.querySelector(".submit");
        let check = <HTMLInputElement>document.querySelector(".check");
        // let currentdate = <HTMLDivElement>document.querySelector(".date");
        let deleteall = <HTMLDivElement>document.querySelector(".delete");
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
        let name = <HTMLInputElement>document.querySelector(".name");
        let num = <HTMLInputElement>document.querySelector(".num");
        let comment = <HTMLInputElement>document.querySelector(".comment");
        let type = <HTMLSelectElement>document.querySelector("#category");

        console.log("Added Item: " + num.value + " " + name.value + " " + grabDate() + " " + type.value + " " + comment.value);

    }

    function generateItem(_item: Item[], _category: string) {
        let group: HTMLElement = document.createElement(".item");
        for (let item of _item) {
            group.textContent = item.name;
            group.innerHTML = item.name;

            group.appendChild(group);
        }
        return group;
    }
    function grabDate() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        return day + "/" + month + "/" + year;
    }
}