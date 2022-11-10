"use strict";
var shoppingList;
(function (shoppingList) {
    function generateItem(_data) {
        console.log("working");
        for (let category in _data) {
            let items = _data[category];
            let group = null;
            group = generateGroup(items, category);
            let fieldset = document.querySelector("fieldset#" + category);
            if (fieldset && group)
                fieldset.appendChild(group);
        }
    }
    shoppingList.generateItem = generateItem;
    function generateGroup(_items, _category) {
        console.log("group");
        let group = document.createElement("div.item");
        for (let item of _items) {
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = item.name;
            checkbox.name = _category;
            checkbox.id = item.name;
            let label = document.createElement("label");
            label.textContent = item.name;
            label.htmlFor = item.name;
            group.appendChild(checkbox);
            group.appendChild(label);
        }
        return group;
    }
    shoppingList.generateGroup = generateGroup;
})(shoppingList || (shoppingList = {}));
//# sourceMappingURL=generateContent.js.map