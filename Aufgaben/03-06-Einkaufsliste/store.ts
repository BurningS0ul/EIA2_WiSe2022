/* Aufgabe: 03-Einkaufsliste/ 04-Data struct/ 05-Json update / 06-Server Build
Name: Arthur Aguiar Rafael
Matrikel: 271023
Datum: 27.10.2022/ 03.11.2022 / 10.11.2022 / 19.11.2022
Quellen: - / - / - / Bastian Aberle
*/

namespace shoppingList {

    window.addEventListener("load", handleLoad);
    let url: string = "https://webuser.hs-furtwangen.de/~aguiarra/Database/";
    let query: URLSearchParams = new URLSearchParams();
    let checkbox: HTMLInputElement = document.createElement("input");
    checkbox.type = "checkbox";
    let trash: HTMLElement = <HTMLElement>document.createElement("i");
    trash.classList.add("fa-solid");
    trash.classList.add("fa-trash-can");
    let placehold: HTMLLabelElement = <HTMLLabelElement>document.querySelector("Label");

    async function handleLoad(_event: Event): Promise<void> {

        let response: Response = await fetch("data.json");
        let entry: string = await response.text();
        let data: Data = JSON.parse(entry);
        console.log(data);

        generateItem(data);

        query.set("command", "show");
        query.set("collection", "data");
        console.log(query.toString());

        let res: Response = await fetch(url + "?" + query.toString());
        let resText: string = await res.text();
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

        let bt: HTMLInputElement = <HTMLInputElement>document.querySelector(".submit");
        let deb: HTMLInputElement = <HTMLInputElement>document.querySelector("#DEBUG");
        let del: HTMLButtonElement = <HTMLButtonElement>document.querySelector(".fa-solid.fa-trash-can");
        let delall: HTMLButtonElement = <HTMLButtonElement>document.querySelector(".delete");

        bt.addEventListener("click", logItems);
        deb.addEventListener("click", DebugInfo);
        del.addEventListener("click", deleteItems);
        delall.addEventListener("click", deleteItems);
    }

    async function logItems(_event: Event) {
        // console.log(_event.currentTarget);
        let name = <HTMLInputElement>document.querySelector(".name");
        let num = <HTMLInputElement>document.querySelector(".num");
        let comment = <HTMLInputElement>document.querySelector(".comment");
        let type = <HTMLSelectElement>document.querySelector("#category");
        console.log("Added Item: " + num.value + " " + name.value + " " + grabDate() + " " + type.value + " " + comment.value);

        let im: HTMLDivElement = <HTMLDivElement>document.querySelector(".item");
        let placehold: HTMLLabelElement = <HTMLLabelElement>document.createElement("label");
        im.appendChild(checkbox);
        placehold.textContent = name.value + " " + num.value + " " + grabDate() + " " + type.value + " " + comment.value;
        im.appendChild(placehold);
        im.appendChild(trash);

        let formData: FormData = new FormData(document.forms[0]);
        let json: FormDataJSON = {};

        for (let key of formData.keys())
            if (!json[key]) {
                let values: FormDataEntryValue[] = formData.getAll(key);
                json[key] = values.length > 1 ? values : values[0];
            }

        let newJSON: string = JSON.stringify(json);
        console.log(newJSON);
        query.set("command", "insert");
        query.set("collection", "data");
        query.set("data", newJSON);
        // console.log(JSON.stringify(json));  
        let res: Response = await fetch(url + "?" + query.toString());
        let resText: string = await res.text();
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

    async function deleteItems(_event: Event) {
        console.log("deleted");
        if (_event.currentTarget == document.querySelector(".fa-solid.fa-trash-can")) {
            placehold.removeChild(placehold);
            query.set("command", "delete");
            query.set("collection", "data");
            query.set("id", query.toString());

            let res: Response = await fetch(url + "?" + query.toString());
            let resText: string = await res.text();
            alert(resText);

        }

        if (_event.currentTarget == document.querySelector(".delete")) {
            query.set("command", "delete");
            query.set("collection", "data");
            let res: Response = await fetch(url + "?" + query.toString());
            let resText: string = await res.text();
            alert(resText);
            checkbox.remove();
            placehold.remove();
        }
    }

    async function DebugInfo() {
        query.set("command", "show");
        console.log(query.toString());
        let res: Response = await fetch(url + "?" + query.toString());
        let resText: string = await res.text();
        alert(resText);
    }

    function clearInputs(): void {
        let name = <HTMLInputElement>document.querySelector(".name");
        let num = <HTMLInputElement>document.querySelector(".num");
        let comment = <HTMLInputElement>document.querySelector(".comment");
        let type = <HTMLSelectElement>document.querySelector("#category");
        num.value = "";
        name.value = "";
        type.value = "Choose Category";
        comment.value = "";
    }
}
