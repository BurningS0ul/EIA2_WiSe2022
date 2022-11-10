/* Aufgabe: 03-Einkaufsliste/ 04-Data struct/ 05-Json update
Name: Arthur Aguiar Rafael
Matrikel: 271023
Datum: 27.10.2022/ 03.11.2022/ 10.11.2022
Quellen: -
*/

namespace shoppingList {

    window.addEventListener("load", handleLoad);

    async function handleLoad(_event: Event): Promise<void> {

        let response: Response = await fetch("Data.json");
        let offer: string = await response.text();
        let data: Data = JSON.parse(offer);
        console.log(data);

        generateItem(data);

        let bt: HTMLInputElement = <HTMLInputElement>document.querySelector(".submit");
        let del: HTMLElement = <HTMLElement>document.querySelector(".fa-trash-can");

        bt.addEventListener("click", logItems);
        del.addEventListener("click", deleteItems);
    }

    function logItems(_event: Event) {
        console.log(_event.currentTarget);
        let name = <HTMLInputElement>document.querySelector(".name");
        let num = <HTMLInputElement>document.querySelector(".num");
        let comment = <HTMLInputElement>document.querySelector(".comment");
        let type = <HTMLSelectElement>document.querySelector("#category");

        console.log("Added Item: " + num.value + " " + name.value + " " + grabDate() + " " + type.value + " " + comment.value);

        let checkbox: HTMLInputElement = document.createElement("input");
        checkbox.type = "checkbox";

        let im: HTMLDivElement = <HTMLDivElement>document.querySelector(".item");
        let placehold: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        let trash: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
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

    function deleteItems(_event: Event) {
        console.log("deleted");
        let placehold: HTMLDivElement = <HTMLDivElement>document.querySelector("div");
        if (_event.currentTarget == document.querySelector(".fa-trash-can")) { 
            placehold.removeChild(placehold);
        }

        if (_event.currentTarget == document.querySelector(".delete")) { 
            placehold.remove();
        }
    }
}

