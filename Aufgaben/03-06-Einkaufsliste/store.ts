/* Aufgabe: 03-Einkaufsliste/ 04-Data struct/ 05-Json update / 06-Server Build / 06.5-Server REMAKE
Name: Arthur Aguiar Rafael
Matrikel: 271023
Datum: 27.10.2022/ 03.11.2022 / 10.11.2022 / 19.11.2022 / 23.11.2022
Quellen: - / - / - / Bastian Aberle / Bastian Aberle
*/

namespace shoppinglist {

    interface Item {
        Item: string;
        Amount: string;
        Category: string;
        Checkbox: string;
        NewDate: string;
    }

    interface FormDataJSON {
        [key: string]: FormDataEntryValue | FormDataEntryValue[];
    }

    interface Entrys {
        [category: string]: Item[];
    }

    window.addEventListener("load", handleLoad);
    let url: string = "https://webuser.hs-furtwangen.de/~aguiarra/Database/?";
    let query: URLSearchParams = new URLSearchParams();

    async function handleResponse(): Promise<void> {
        let response: Response = await fetch(url + query.toString());
        let entry: string = await response.text();
        let data: Entrys = JSON.parse(entry);
        loadData(data);

    }

    async function handleLoad(): Promise<void> {
        let button: HTMLInputElement = <HTMLInputElement>document.querySelector(".submit");

        button.addEventListener("click", sendData);
    }


    async function sendData(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);
        let json: FormDataJSON = {};

        //Umwandlung FormData in Json FormData
        for (let key of formData.keys())
            if (!json[key]) {
                let values: FormDataEntryValue[] = formData.getAll(key);
                json[key] = values.length > 1 ? values : values[0];
            }

        let newJSON: string = JSON.stringify(json);

        query.set("command", "insert");
        query.set("collection", "data");
        query.set("data", newJSON);
        handleResponse();
        console.log("data sent");
        loadInput();
    }

    function loadData(newData: Entrys): void {

        let list: string[] = [];
        for (let num in newData.data) {
            list.push(num);
        }

        for (let index of list) {
            let item: string = newData.data[index].Item;
            let amount: string = newData.data[index].Amount;
            let category: string = newData.data[index].Category;
            let date: string = newData.data[index].NewDate.toString();
            let comment: string = newData.data[index].Area;
            let purchaseCheckbox: string = newData.data[index].Checkbox;

            let purchase: string;
            if (purchaseCheckbox == "on") {
                purchase = " buy";

            } else {
                purchase = "";
            }
            loadItem(item, amount, category, comment, purchase, date, index);
        }
    }

    function loadInput(): void {
        let formData: FormData = new FormData(document.forms[0]);
        let amount: string = formData.get("input#quantity")!.toString();
        let item: string = formData.get(".name")!.toString();
        let date: string = formData.get(".date")!.toString();
        let category: string = formData.get("#category")!.toString();
        let comment: string = formData.get(".comment")!.toString();
        let index: string;

        let purchaseCheckbox: FormDataEntryValue = formData.get("Checkbox")!;
        let purchase: string = "";
        if (purchaseCheckbox == null) {
            purchase = "";
        } else {
            purchase = " buy";
        }
       
        loadItem(item, amount, category, comment, purchase, date, index);
        window.open("./list.html", "_self");
    }

    function loadItem(amount: string, item: string, category: string, comment: string, purchase: string, date: string, index: string): void {
        let newDiv: HTMLDivElement = document.createElement("div");

        newDiv.id = "createDiv";
        let parent: Element = document.querySelector(".item")!;
        newDiv.className = "genoutput";
        newDiv.innerHTML = date + " " + amount + " " + item + " " + comment + " " + purchase;

        parent.appendChild(newDiv);

        let newContainer: HTMLDivElement = document.createElement("div");
        newContainer.id = "containerIcons";
        newDiv.appendChild(newContainer);

        let newCheckbox: HTMLInputElement = document.createElement("input");
        newCheckbox.type = "checkbox";
        newCheckbox.name = "Checkbox";
        newContainer.appendChild(newCheckbox);

        let newEdit: HTMLElement = document.createElement("i");
        newEdit.classList.add("fa-solid");
        newEdit.classList.add("fa-pen-to-square");
        newContainer.appendChild(newEdit);

        let newTrash: HTMLElement = document.createElement("i");
        newTrash.classList.add("fa-solid");
        newTrash.classList.add("fa-trash-can");
        newContainer.appendChild(newTrash);

        newEdit.addEventListener("click", function (): void {
            editItem(newDiv, item, amount, comment, date, index);
        });

        newTrash.addEventListener("click", function (): void {
            deleteItem(newDiv, index);
        });

        newCheckbox.addEventListener("click", function (): void {
            getDate(newDiv, index, item, amount, category, comment, date, purchase);
        });

    }

    async function getDate(newDiv: HTMLDivElement, index: string, item: string, amount: string, category: string, comment: string, date: string, purchase: string): Promise<void> {
        console.log("checkbox");
        var dateObj: Date = new Date();
        var month: number = dateObj.getUTCMonth() + 1;
        var day: number = dateObj.getUTCDate();
        var year: number = dateObj.getUTCFullYear();


        var NewDate: string = year + "-" + month + "-" + day;

        newDiv.innerHTML = NewDate + " " + amount + " " + item + " " + comment + " " + purchase;

        let newContainer: HTMLDivElement = document.createElement("div");
        newContainer.id = "containerIcons";
        newDiv.appendChild(newContainer);

        let newCheckbox: HTMLInputElement = document.createElement("input");
        newCheckbox.type = "checkbox";
        newCheckbox.checked = true;
        newContainer.appendChild(newCheckbox);

        let newEdit: HTMLElement = document.createElement("i");
        newEdit.classList.add("fa-solid");
        newEdit.classList.add("fa-pen-to-square");
        newContainer.appendChild(newEdit);

        let newTrash: HTMLElement = document.createElement("i");
        newTrash.classList.add("fa-solid");
        newTrash.classList.add("fa-trash-can");
        newContainer.appendChild(newTrash);

        newEdit.addEventListener("click", function (): void {
            editItem(newDiv, item, amount, comment, date, index);
        });

        newTrash.addEventListener("click", function (): void {
            deleteItem(newDiv, index);
        });

        newCheckbox.addEventListener("click", function (): void {
            getDate(newDiv, index, item, amount, category, comment, date, purchase);
        });
        let json: FormDataJSON = { NewDate };
        let newJSON: string = JSON.stringify(json);

        let query: URLSearchParams = new URLSearchParams();
        query.set("command", "update");
        query.set("collection", "data");
        query.set("id", index);

        query.set("data", newJSON);


        handleResponse();
        console.log("data sent");

    }

    async function deleteItem(newDiv: HTMLDivElement, index: string): Promise<void> {
        newDiv.parentElement!.removeChild(newDiv);
        let query: URLSearchParams = new URLSearchParams();

        query.set("command", "delete");
        query.set("collection", "data");
        query.set("id", index.toString());

        handleResponse();
        console.log("deleted");

    }

    async function editItem(newDiv: HTMLDivElement, item: string, amount: string, comment: string, date: string, index: string): Promise<void> {
        let itemx: HTMLInputElement = document.querySelector("input.name")!;
        itemx.value = item;
        let amountx: HTMLInputElement = document.querySelector("input.num")!;
        amountx.value = amount.toString();
        let commentx: HTMLInputElement = document.querySelector("input.comment")!;
        commentx.value = comment;
        let datex: HTMLInputElement = document.querySelector("input.date")!;
        datex.value = date;
        deleteItem(newDiv, index);
    }
}