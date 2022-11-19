namespace shoppingList {
    export interface Item {
        newItem: string;
        name: string;
        amount: number;
        comment: string;
    }

    export interface Data {
        [category: string]: Item[];
    }

    export interface FormDataJSON {
        [key: string]: FormDataEntryValue | FormDataEntryValue[];
    }

    export function generateItem(_data: Data) {
        for (let category in _data) {
            let items: Item[] = _data[category];

            let list: any[] = [];
            for (let test in _data) {
                list.push(test);
            }

            let group: HTMLElement | null = null;
            group = generateGroup(items, category);

            let fieldset: HTMLFieldSetElement | null = document.querySelector("fieldset#" + category);
            if (fieldset && group)
                fieldset.appendChild(group);
        }
    }
    function generateGroup(_items: Item[], _category: string) {
        console.log("group");
        let group = <HTMLDivElement>document.createElement("div.item");
        for (let item of _items) {
            let checkbox: HTMLInputElement = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = item.name;
            checkbox.name = _category;
            checkbox.id = item.name;

            let label: HTMLLabelElement = document.createElement("label");
            label.textContent = item.name;
            label.htmlFor = item.name;

            group.appendChild(checkbox);
            group.appendChild(label);
        }
        return group;
    }
}